-- Run in Supabase SQL Editor. RLS ensures users only access their own data.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);
alter table public.profiles add column if not exists role text not null default 'user';
create table if not exists public.watchlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null check (symbol ~ '^[A-Z.-]{1,10}$'),
  created_at timestamptz not null default now(), primary key (user_id, symbol)
);
create table if not exists public.funding_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
  amount numeric(14,2) not null check(amount>0), currency text not null default 'USD',
  transaction_reference text, status text not null default 'pending' check(status in ('pending','approved','rejected')),
  review_note text, reviewed_by uuid references auth.users(id), reviewed_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
  amount numeric(14,2) not null check(amount>0), currency text not null default 'USD', destination text not null,
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  review_note text, reviewed_by uuid references auth.users(id), reviewed_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.deposit_destinations (
  id uuid primary key default gen_random_uuid(), network text not null, address text not null,
  instructions text, active boolean not null default true, created_by uuid not null references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.admin_audit_log (
  id bigint generated always as identity primary key, admin_id uuid not null references auth.users(id),
  action text not null, entity_type text not null, entity_id text, details jsonb not null default '{}', created_at timestamptz not null default now()
);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from profiles where id=auth.uid() and role='admin')$$;
alter table public.profiles enable row level security; alter table public.watchlists enable row level security;
alter table public.funding_requests enable row level security; alter table public.withdrawal_requests enable row level security;
alter table public.deposit_destinations enable row level security; alter table public.admin_audit_log enable row level security;
create policy "own profile" on public.profiles for select using (auth.uid()=id or public.is_admin());
create policy "own watchlist" on public.watchlists for all using (auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "view own funding" on public.funding_requests for select using(auth.uid()=user_id or public.is_admin());
create policy "request own funding" on public.funding_requests for insert with check(auth.uid()=user_id and status='pending');
create policy "view own withdrawals" on public.withdrawal_requests for select using(auth.uid()=user_id or public.is_admin());
create policy "request own withdrawal" on public.withdrawal_requests for insert with check(auth.uid()=user_id and status='pending');
create policy "view active destination" on public.deposit_destinations for select using(active or public.is_admin());
create policy "admins view audits" on public.admin_audit_log for select using(public.is_admin());
create or replace function public.review_financial_request(request_table text,request_id uuid,new_status text,review_note text default null) returns void language plpgsql security definer set search_path=public as $$
begin
 if not public.is_admin() then raise exception 'Administrator authorization required'; end if;
 if new_status not in ('approved','rejected') then raise exception 'Invalid decision'; end if;
 if request_table='funding_requests' then update funding_requests set status=new_status,review_note=review_financial_request.review_note,reviewed_by=auth.uid(),reviewed_at=now() where id=request_id and status='pending';
 elsif request_table='withdrawal_requests' then update withdrawal_requests set status=new_status,review_note=review_financial_request.review_note,reviewed_by=auth.uid(),reviewed_at=now() where id=request_id and status='pending';
 else raise exception 'Invalid request type'; end if;
 if not found then raise exception 'Pending request not found'; end if;
 insert into admin_audit_log(admin_id,action,entity_type,entity_id,details) values(auth.uid(),new_status,request_table,request_id::text,jsonb_build_object('note',review_note));
end$$;
create or replace function public.replace_deposit_destination(new_network text,new_address text,new_instructions text default null) returns void language plpgsql security definer set search_path=public as $$
declare new_id uuid; begin
 if not public.is_admin() then raise exception 'Administrator authorization required'; end if;
 if length(trim(new_address))<8 then raise exception 'Invalid public destination'; end if;
 update deposit_destinations set active=false where active=true;
 insert into deposit_destinations(network,address,instructions,created_by) values(new_network,new_address,new_instructions,auth.uid()) returning id into new_id;
 insert into admin_audit_log(admin_id,action,entity_type,entity_id,details) values(auth.uid(),'destination_replaced','deposit_destination',new_id::text,jsonb_build_object('network',new_network));
end$$;
create or replace function public.create_profile() returns trigger language plpgsql security definer set search_path=public as $$begin insert into profiles(id) values(new.id) on conflict do nothing;return new;end$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.create_profile();
-- Promote the first admin manually after signup (replace the email):
-- update public.profiles set role='admin' where id=(select id from auth.users where email='admin@example.com');
