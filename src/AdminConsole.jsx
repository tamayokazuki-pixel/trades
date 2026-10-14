import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Clock3, Copy, LogOut, ShieldCheck, WalletCards, X } from 'lucide-react'
import { isSupabaseReady, supabase } from './lib/supabase'

const tabs = ['Overview','Funding','Withdrawals','Deposit address']
const money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'})

export default function AdminConsole(){
  const [session,setSession]=useState(null),[role,setRole]=useState(null),[tab,setTab]=useState('Overview'),[rows,setRows]=useState([]),[address,setAddress]=useState(''),[network,setNetwork]=useState('USDC — Solana'),[note,setNote]=useState(''),[message,setMessage]=useState(''),[refreshKey,setRefreshKey]=useState(0)
  useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(async({data})=>{setSession(data.session);if(data.session){const {data:p}=await supabase.from('profiles').select('role').eq('id',data.session.user.id).single();setRole(p?.role||'user')}})},[])
  useEffect(()=>{
    if(role!=='admin'||!supabase)return
    const table=tab==='Withdrawals'?'withdrawal_requests':'funding_requests'
    if(tab==='Funding'||tab==='Withdrawals'){
      supabase.from(table).select('*').order('created_at',{ascending:false}).then(({data})=>setRows(data||[]))
    }
    if(tab==='Deposit address'){
      supabase.from('deposit_destinations').select('*').eq('active',true).maybeSingle().then(({data})=>{
        if(data){setAddress(data.address);setNetwork(data.network);setNote(data.instructions||'')}
      })
    }
  },[tab,role,refreshKey])
  async function decide(row,status){const table=tab==='Withdrawals'?'withdrawal_requests':'funding_requests';const {error}=await supabase.rpc('review_financial_request',{request_table:table,request_id:row.id,new_status:status,review_note:`${status} by operations`});setMessage(error?.message||`Request ${status}`);setRefreshKey(k=>k+1)}
  async function saveAddress(e){e.preventDefault();const {error}=await supabase.rpc('replace_deposit_destination',{new_network:network,new_address:address,new_instructions:note});setMessage(error?.message||'Deposit destination updated and audit logged');setRefreshKey(k=>k+1)}
  if(!isSupabaseReady)return <Gate title="Admin console unavailable" text="Connect Supabase and run the included schema before using secure operations."/>
  if(!session)return <Gate title="Authentication required" text="Sign in from the main website with an authorized administrator account."/>
  if(role===null)return <Gate title="Checking authorization" text="Verifying your operations role…"/>
  if(role!=='admin')return <Gate title="Access denied" text="This account does not have an administrator role."/>
  const pending=rows.filter(r=>r.status==='pending').length
  return <div className="admin-shell"><aside className="admin-side"><a className="admin-brand" href="/"><span>R1</span> RESERVE ONE<small>OPERATIONS</small></a><nav>{tabs.map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</nav><div className="admin-user"><ShieldCheck/><span>{session.user.email}<small>Administrator</small></span><button onClick={()=>supabase.auth.signOut().then(()=>location.href='/')}><LogOut/></button></div></aside><main className="admin-main"><header><div><span className="kicker">SECURE OPERATIONS DESK</span><h1>{tab}</h1></div><a href="/"><ArrowLeft/> Public website</a></header>{message&&<div className="admin-message"><Check/>{message}<button onClick={()=>setMessage('')}><X/></button></div>}
    {tab==='Overview'&&<><section className="admin-cards"><div><Clock3/><span>Pending reviews</span><strong>{pending}</strong></div><div><WalletCards/><span>Operations status</span><strong className="online">ONLINE</strong></div><div><ShieldCheck/><span>Approval policy</span><strong>MANUAL</strong></div></section><section className="admin-notice"><span>DUAL-CONTROL WORKFLOW</span><h2>Every movement requires a recorded decision.</h2><p>Funding confirmations and withdrawal releases remain pending until reviewed by an authorized administrator. Every decision and deposit-address change is written to the audit log.</p></section></>}
    {(tab==='Funding'||tab==='Withdrawals')&&<RequestTable rows={rows} type={tab} decide={decide}/>} 
    {tab==='Deposit address'&&<form className="address-form" onSubmit={saveAddress}><span className="kicker">ACTIVE FUNDING DESTINATION</span><h2>Update deposit instructions</h2><p>This destination is displayed to users requesting account funding. Changes are versioned and audit logged. Never enter a private key or recovery phrase.</p><label>NETWORK / RAIL<input value={network} onChange={e=>setNetwork(e.target.value)} required/></label><label>PUBLIC DEPOSIT ADDRESS<div className="copy-input"><input value={address} onChange={e=>setAddress(e.target.value)} required/><button type="button" onClick={()=>navigator.clipboard.writeText(address)}><Copy/></button></div></label><label>USER INSTRUCTIONS<textarea value={note} onChange={e=>setNote(e.target.value)} rows="4"/></label><button className="admin-save">Publish new destination</button></form>}
  </main></div>
}
function RequestTable({rows,type,decide}){return <section className="request-list"><div className="request-head"><span>REFERENCE</span><span>USER</span><span>AMOUNT</span><span>STATUS</span><span>ACTION</span></div>{rows.length?rows.map(r=><div className="request-row" key={r.id}><span>#{String(r.id).slice(0,8)}</span><span>{String(r.user_id).slice(0,8)}…</span><strong>{money.format(Number(r.amount))}<small>{r.currency}</small></strong><em className={`status ${r.status}`}>{r.status}</em><div>{r.status==='pending'?<><button className="approve" onClick={()=>decide(r,'approved')}>Approve</button><button onClick={()=>decide(r,'rejected')}>Reject</button></>:<small>Reviewed</small>}</div></div>):<div className="empty">No {type.toLowerCase()} requests to review.</div>}</section>}
function Gate({title,text}){return <div className="admin-gate"><div><span className="admin-gate-mark">R1</span><ShieldCheck/><h1>{title}</h1><p>{text}</p><a href="/"><ArrowLeft/> Return to website</a></div></div>}
