export const CATEGORIES = [
  'All Markets',
  'Oil & Energy',
  'Trump Stocks',
  'Tech & AI',
  'Financials & Crypto',
  'Defense & Industrial',
  'Healthcare & Consumer'
]

export const STOCKS = [
  // ─── OIL & ENERGY: INTEGRATED MAJORS ─────────────────────────────────────────
  {
    symbol: 'XOM',
    name: 'ExxonMobil Corp.',
    price: 172.33,
    change: 2.01,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$694.7B',
    thesis: 'Largest Western integrated oil supermajor spanning Permian & Guyana upstream production, global refining, chemicals, and low-carbon LNG.'
  },
  {
    symbol: 'CVX',
    name: 'Chevron Corporation',
    price: 215.39,
    change: 1.61,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$418.8B',
    thesis: 'Global integrated energy leader with premier Permian Basin acreage, Gulf of Mexico deepwater assets, and Australian LNG export infrastructure.'
  },
  {
    symbol: 'SHEL',
    name: 'Shell plc',
    price: 74.82,
    change: 0.94,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$276.0B',
    thesis: 'European supermajor and the world’s largest integrated liquefied natural gas (LNG) trader and deepwater operator.'
  },
  {
    symbol: 'TTE',
    name: 'TotalEnergies SE',
    price: 68.45,
    change: 1.12,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$198.0B',
    thesis: 'French integrated energy major combining low-cost Middle East, African, and LNG upstream production with utility-scale power generation.'
  },
  {
    symbol: 'BP',
    name: 'BP p.l.c.',
    price: 46.36,
    change: 4.16,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$124.4B',
    thesis: 'Global integrated oil and gas producer with major Gulf of Mexico, North Sea, and Middle East upstream operations and global trading desks.'
  },
  {
    symbol: 'EQNR',
    name: 'Equinor ASA',
    price: 31.84,
    change: 1.45,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$98.6B',
    thesis: 'Norwegian continental shelf operator and Europe’s premier pipeline gas and offshore energy supplier.'
  },
  {
    symbol: 'PBR',
    name: 'Petrobras (Petróleo Brasileiro)',
    price: 14.62,
    change: 0.88,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$89.3B',
    thesis: 'Brazilian deepwater and ultra-deepwater pre-salt oil giant with high-margin offshore floating production systems (FPSOs).'
  },
  {
    symbol: 'CNQ',
    name: 'Canadian Natural Resources',
    price: 38.90,
    change: 1.34,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$82.4B',
    thesis: 'Canada’s largest crude oil and natural gas producer with long-life, low-decline oil sands mining and thermal in-situ reserves.'
  },
  {
    symbol: 'SU',
    name: 'Suncor Energy Inc.',
    price: 44.18,
    change: 0.76,
    category: 'Oil & Energy',
    subsector: 'Integrated Major',
    exchange: 'NYSE',
    marketCap: '$56.1B',
    thesis: 'Integrated Canadian oil sands producer, upgrader, and downstream refiner operating the Petro-Canada retail network.'
  },

  // ─── OIL & ENERGY: EXPLORATION & PRODUCTION (E&P) ────────────────────────────
  {
    symbol: 'COP',
    name: 'ConocoPhillips',
    price: 137.56,
    change: 2.58,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$165.3B',
    thesis: 'World’s largest independent E&P company with low cost-of-supply reserves across the Permian, Eagle Ford, Bakken, Alaska, and global LNG.'
  },
  {
    symbol: 'EOG',
    name: 'EOG Resources, Inc.',
    price: 150.51,
    change: 1.59,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$80.2B',
    thesis: 'Premier unconventional shale producer known as the technology and capital-return benchmark in the Delaware Basin, Eagle Ford, and Utica.'
  },
  {
    symbol: 'OXY',
    name: 'Occidental Petroleum Corp.',
    price: 61.13,
    change: 1.70,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$61.1B',
    thesis: 'Major Permian Basin producer, enhanced oil recovery specialist, OxyChem chemical manufacturer, and Berkshire Hathaway core holding.'
  },
  {
    symbol: 'FANG',
    name: 'Diamondback Energy, Inc.',
    price: 195.11,
    change: 1.55,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NASDAQ',
    marketCap: '$54.9B',
    thesis: 'Pure-play Permian Basin independent producer with industry-leading drilling efficiency and Midland Basin scale following the Endeavor merger.'
  },
  {
    symbol: 'DVN',
    name: 'Devon Energy Corporation',
    price: 48.96,
    change: 1.45,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$53.9B',
    thesis: 'Leading US multi-basin oil and gas producer anchored by its world-class Delaware Basin position plus Williston, Eagle Ford, and Anadarko assets.'
  },
  {
    symbol: 'EQT',
    name: 'EQT Corporation',
    price: 53.22,
    change: 0.74,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$33.3B',
    thesis: 'Vertically integrated Appalachian Basin natural gas giant positioned to supply rising AI data center power and US LNG export demand.'
  },
  {
    symbol: 'TPL',
    name: 'Texas Pacific Land Corp.',
    price: 365.32,
    change: 1.20,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$25.2B',
    thesis: 'One of the largest private landowners in Texas, collecting high-margin Permian oil & gas royalties, surface easements, and water midstream fees.'
  },
  {
    symbol: 'OVV',
    name: 'Ovintiv Inc.',
    price: 65.12,
    change: 1.94,
    category: 'Oil & Energy',
    subsector: 'Exploration & Production',
    exchange: 'NYSE',
    marketCap: '$18.0B',
    thesis: 'North American multi-basin producer focused on high-return crude and condensate inventory across the Permian, Montney, and Uinta.'
  },

  // ─── OIL & ENERGY: OILFIELD SERVICES & EQUIPMENT ─────────────────────────────
  {
    symbol: 'SLB',
    name: 'SLB (Schlumberger)',
    price: 51.40,
    change: 1.18,
    category: 'Oil & Energy',
    subsector: 'Oilfield Services',
    exchange: 'NYSE',
    marketCap: '$72.6B',
    thesis: 'Global leader in reservoir performance, well construction, subsea production systems, and digital oilfield subsurface software.'
  },
  {
    symbol: 'BKR',
    name: 'Baker Hughes Company',
    price: 44.85,
    change: 1.62,
    category: 'Oil & Energy',
    subsector: 'Oilfield Services',
    exchange: 'NASDAQ',
    marketCap: '$44.5B',
    thesis: 'Energy technology leader supplying LNG liquefaction turbines, gas compression, oilfield services, and industrial power equipment.'
  },
  {
    symbol: 'HAL',
    name: 'Halliburton Company',
    price: 34.72,
    change: -0.42,
    category: 'Oil & Energy',
    subsector: 'Oilfield Services',
    exchange: 'NYSE',
    marketCap: '$30.4B',
    thesis: 'Dominant North American hydraulic fracturing, directional drilling, completion tools, and global well intervention services provider.'
  },

  // ─── OIL & ENERGY: REFINING & DOWNSTREAM ─────────────────────────────────────
  {
    symbol: 'MPC',
    name: 'Marathon Petroleum Corp.',
    price: 176.40,
    change: 1.85,
    category: 'Oil & Energy',
    subsector: 'Refining & Downstream',
    exchange: 'NYSE',
    marketCap: '$124.0B',
    thesis: 'Largest US crude oil refiner by capacity with integrated midstream logistics via MPLX across the Gulf Coast, Midwest, and West Coast.'
  },
  {
    symbol: 'VLO',
    name: 'Valero Energy Corporation',
    price: 158.90,
    change: 1.42,
    category: 'Oil & Energy',
    subsector: 'Refining & Downstream',
    exchange: 'NYSE',
    marketCap: '$122.0B',
    thesis: 'Premier international manufacturer of transportation fuels, Gulf Coast complex refining, and Diamond Green Diesel renewable fuels.'
  },
  {
    symbol: 'PSX',
    name: 'Phillips 66',
    price: 142.15,
    change: 1.10,
    category: 'Oil & Energy',
    subsector: 'Refining & Downstream',
    exchange: 'NYSE',
    marketCap: '$111.0B',
    thesis: 'Diversified downstream energy operator spanning refining, NGL midstream fractionation, CPChem petrochemicals, and fuel marketing.'
  },

  // ─── OIL & ENERGY: MIDSTREAM, PIPELINES & LNG ────────────────────────────────
  {
    symbol: 'ENB',
    name: 'Enbridge Inc.',
    price: 49.35,
    change: 0.68,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$105.7B',
    thesis: 'North America’s largest energy infrastructure operator, moving 30% of continental crude oil and 20% of US natural gas consumption.'
  },
  {
    symbol: 'WMB',
    name: 'The Williams Companies',
    price: 54.12,
    change: 1.29,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$87.4B',
    thesis: 'Owner of the Transco interstate pipeline highway connecting Gulf Coast and Marcellus gas to East Coast power grids and LNG terminals.'
  },
  {
    symbol: 'EPD',
    name: 'Enterprise Products Partners',
    price: 36.80,
    change: 0.92,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$79.7B',
    thesis: 'Blue-chip midstream partnership with 50,000+ miles of NGL, crude, natural gas, and petrochemical pipelines and Houston Ship Channel exports.'
  },
  {
    symbol: 'ET',
    name: 'Energy Transfer LP',
    price: 20.65,
    change: 1.52,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$70.5B',
    thesis: 'Massive US midstream network spanning intrastate and interstate gas pipelines, Permian crude gathering, and Nederland NGL export terminals.'
  },
  {
    symbol: 'KMI',
    name: 'Kinder Morgan, Inc.',
    price: 28.45,
    change: 0.84,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$63.2B',
    thesis: 'Operates 82,000 miles of pipelines transporting 40% of US natural gas along with refined products terminals and CO2 infrastructure.'
  },
  {
    symbol: 'LNG',
    name: 'Cheniere Energy, Inc.',
    price: 214.60,
    change: 1.76,
    category: 'Oil & Energy',
    subsector: 'Midstream & LNG',
    exchange: 'NYSE',
    marketCap: '$48.9B',
    thesis: 'Largest producer and exporter of liquefied natural gas in the United States via the Sabine Pass and Corpus Christi liquefaction terminals.'
  },

  // ─── TRUMP STOCKS / TRUMP ECOSYSTEM ──────────────────────────────────────────
  {
    symbol: 'DJT',
    name: 'Trump Media & Technology Group',
    price: 7.54,
    change: -2.71,
    category: 'Trump Stocks',
    subsector: 'Flagship Trump Equity',
    exchange: 'NASDAQ',
    marketCap: '$2.10B',
    trumpLink: 'Founded & majority-owned by President Donald J. Trump',
    thesis: 'Flagship Trump equity operating Truth Social, Truth+ streaming, Truth.Fi America-First fintech vehicles, and a corporate Bitcoin treasury.'
  },
  {
    symbol: 'ABTC',
    name: 'American Bitcoin Corp.',
    price: 7.83,
    change: 3.12,
    category: 'Trump Stocks',
    subsector: 'Trump Family Crypto',
    exchange: 'NASDAQ',
    marketCap: '$570.2M',
    trumpLink: 'Co-founded by Eric Trump (CSO) & Donald Trump Jr.',
    thesis: 'US Bitcoin mining and strategic Bitcoin reserve accumulation platform co-founded by Eric Trump and Donald Trump Jr. in partnership with Hut 8.'
  },
  {
    symbol: 'UMAC',
    name: 'Unusual Machines, Inc.',
    price: 21.88,
    change: 3.45,
    category: 'Trump Stocks',
    subsector: 'Trump Jr. Advisory',
    exchange: 'NYSE American',
    marketCap: '$1.09B',
    trumpLink: 'Donald Trump Jr. Advisory Board & 331K+ Share Stake',
    thesis: 'NDAA-compliant US drone and UAV component manufacturer backed by Donald Trump Jr. as advisor to onshore domestic defense drone supply chains.'
  },
  {
    symbol: 'DOMH',
    name: 'Dominari Holdings Inc.',
    price: 2.92,
    change: 2.10,
    category: 'Trump Stocks',
    subsector: 'Trump Jr. & Eric Advisory',
    exchange: 'NASDAQ',
    marketCap: '$66.0M',
    trumpLink: 'Donald Trump Jr. & Eric Trump Advisory Board & Investors',
    thesis: 'Trump Tower-headquartered financial services, investment banking, AI, and data-center holding company where both Trump sons serve as advisors.'
  },
  {
    symbol: 'PSQH',
    name: 'PSQ Holdings (PublicSquare)',
    price: 6.34,
    change: 1.82,
    category: 'Trump Stocks',
    subsector: 'Trump Jr. Board',
    exchange: 'NYSE',
    marketCap: '$213.4M',
    trumpLink: 'Donald Trump Jr. Board of Directors & Investor',
    thesis: 'Operator of the PublicSquare patriotic consumer marketplace and Credova fintech payments ecosystem with Donald Trump Jr. on its board.'
  },
  {
    symbol: 'RUM',
    name: 'Rumble Inc.',
    price: 8.42,
    change: 2.68,
    category: 'Trump Stocks',
    subsector: 'Truth Social Partner',
    exchange: 'NASDAQ',
    marketCap: '$2.40B',
    trumpLink: 'Core Cloud & Video Infrastructure Partner to Truth Social',
    thesis: 'Independent video platform and Rumble Cloud infrastructure provider powering Truth Social video streaming and holding a corporate Bitcoin reserve.'
  },
  {
    symbol: 'PHUN',
    name: 'Phunware, Inc.',
    price: 1.98,
    change: 1.02,
    category: 'Trump Stocks',
    subsector: 'Campaign Tech Partner',
    exchange: 'NASDAQ',
    marketCap: '$40.1M',
    trumpLink: 'Trump Campaign Mobile App & Voter Engagement Partner',
    thesis: 'Enterprise mobile cloud and AI platform historically sought by retail traders as a high-beta Trump campaign technology proxy.'
  },
  {
    symbol: 'HUT',
    name: 'Hut 8 Corp.',
    price: 24.65,
    change: 4.12,
    category: 'Trump Stocks',
    subsector: 'Trump Family Crypto',
    exchange: 'NASDAQ',
    marketCap: '$2.30B',
    trumpLink: 'Majority Partner in Trump Family’s American Bitcoin (ABTC)',
    thesis: 'Energy infrastructure and Bitcoin mining operator that launched American Bitcoin Corp. alongside Eric Trump and Donald Trump Jr.'
  },
  {
    symbol: 'NMAX',
    name: 'Newsmax Inc.',
    price: 14.20,
    change: 1.94,
    category: 'Trump Stocks',
    subsector: 'Conservative Media',
    exchange: 'NYSE',
    marketCap: '$1.82B',
    trumpLink: 'Allied Conservative Broadcast & Digital News Network',
    thesis: 'Cable news and digital media network closely aligned with Trump political coverage and audience momentum.'
  },
  {
    symbol: 'GEO',
    name: 'The GEO Group, Inc.',
    price: 28.75,
    change: 2.31,
    category: 'Trump Stocks',
    subsector: 'Trump Policy Beneficiary',
    exchange: 'NYSE',
    marketCap: '$3.90B',
    trumpLink: 'Federal Immigration & Border Enforcement Contractor',
    thesis: 'Leading government contractor providing secure detention facilities, processing centers, and electronic monitoring for federal enforcement.'
  },
  {
    symbol: 'CXW',
    name: 'CoreCivic, Inc.',
    price: 21.40,
    change: 1.85,
    category: 'Trump Stocks',
    subsector: 'Trump Policy Beneficiary',
    exchange: 'NYSE',
    marketCap: '$2.40B',
    trumpLink: 'Federal Detention & Corrections Infrastructure Partner',
    thesis: 'Owner and operator of correctional, detention, and residential reentry facilities benefiting from expanded federal border security mandates.'
  },
  {
    symbol: 'MP',
    name: 'MP Materials Corp.',
    price: 26.80,
    change: 3.15,
    category: 'Trump Stocks',
    subsector: 'America First Policy',
    exchange: 'NYSE',
    marketCap: '$4.40B',
    trumpLink: 'Domestic Rare Earths & Critical Minerals Champion',
    thesis: 'Owner of the Mountain Pass rare earth mine and Texas magnetics facility—central to Trump administration critical mineral independence.'
  },
  {
    symbol: 'NUE',
    name: 'Nucor Corporation',
    price: 162.30,
    change: 1.48,
    category: 'Trump Stocks',
    subsector: 'America First Policy',
    exchange: 'NYSE',
    marketCap: '$38.6B',
    trumpLink: 'US Steel Tariff & Domestic Manufacturing Beneficiary',
    thesis: 'Largest and most diversified steel producer in North America, directly aligned with protective steel tariffs and domestic industrial reshoring.'
  },

  // ─── TECH & AI MEGA-CAPS ─────────────────────────────────────────────────────
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 228.52,
    change: 0.97,
    category: 'Tech & AI',
    subsector: 'AI Semiconductors',
    exchange: 'NASDAQ',
    marketCap: '$5.09T',
    trumpLink: 'Disclosed in President Trump’s personal equity portfolio',
    thesis: 'Global leader in accelerated computing, Blackwell/Rubin AI data center GPUs, sovereign AI infrastructure, and CUDA enterprise software.'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 341.27,
    change: 0.09,
    category: 'Tech & AI',
    subsector: 'Consumer Ecosystem',
    exchange: 'NASDAQ',
    marketCap: '$4.37T',
    trumpLink: 'Disclosed in President Trump’s personal equity portfolio',
    thesis: 'World’s premier consumer hardware and services ecosystem across iPhone, Mac, custom Apple Silicon, and 2.2B+ active devices.'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 543.45,
    change: 0.43,
    category: 'Tech & AI',
    subsector: 'Cloud & Enterprise AI',
    exchange: 'NASDAQ',
    marketCap: '$4.04T',
    trumpLink: 'Disclosed in President Trump’s personal equity portfolio',
    thesis: 'Hyperscale Azure cloud infrastructure, enterprise productivity suite, and Copilot generative AI deployment leader.'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 258.58,
    change: -0.37,
    category: 'Tech & AI',
    subsector: 'Cloud & Commerce',
    exchange: 'NASDAQ',
    marketCap: '$2.72T',
    thesis: 'Global leader in cloud computing via AWS, custom Trainium/Inferentia AI chips, digital advertising, and automated fulfillment logistics.'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 214.80,
    change: 1.15,
    category: 'Tech & AI',
    subsector: 'Search, Cloud & AI',
    exchange: 'NASDAQ',
    marketCap: '$2.64T',
    thesis: 'Parent of Google Search, YouTube, Google Cloud, Waymo autonomous vehicles, and Gemini frontier AI models running on custom TPUs.'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 762.50,
    change: 2.63,
    category: 'Tech & AI',
    subsector: 'Social & AI Platforms',
    exchange: 'NASDAQ',
    marketCap: '$1.93T',
    thesis: 'Operates Facebook, Instagram, and WhatsApp for 3.3B+ daily users while scaling Llama AI models and AI-driven advertising engines.'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 375.23,
    change: -0.74,
    category: 'Tech & AI',
    subsector: 'Autonomous & Energy',
    exchange: 'NASDAQ',
    marketCap: '$1.19T',
    thesis: 'Leader in electric vehicles, Full Self-Driving neural networks, Cybercab autonomous fleet, Optimus robotics, and utility-scale Megapack storage.'
  },
  {
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    price: 234.60,
    change: 1.88,
    category: 'Tech & AI',
    subsector: 'AI Semiconductors',
    exchange: 'NASDAQ',
    marketCap: '$1.09T',
    thesis: 'Dominant supplier of custom AI XPUs for hyperscalers, high-speed Ethernet AI networking fabric, and VMware enterprise infrastructure software.'
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 153.19,
    change: 4.06,
    category: 'Tech & AI',
    subsector: 'Defense & Enterprise AI',
    exchange: 'NASDAQ',
    marketCap: '$366.4B',
    thesis: 'Mission-critical AI operating system (AIP, Gotham, Foundry) powering US defense intelligence, battlefield logistics, and commercial enterprises.'
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    price: 28.45,
    change: 1.32,
    category: 'Tech & AI',
    subsector: 'US Semiconductor Foundry',
    exchange: 'NASDAQ',
    marketCap: '$122.0B',
    thesis: 'Strategic US domestic semiconductor manufacturer scaling advanced foundry nodes and defense-grade chip fabrication.'
  },

  // ─── FINANCIALS, BANKING & CRYPTO ────────────────────────────────────────────
  {
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    price: 520.59,
    change: 0.58,
    category: 'Financials & Crypto',
    subsector: 'Diversified Holding',
    exchange: 'NYSE',
    marketCap: '$1.11T',
    thesis: 'Fortress conglomerate owning BNSF Railway, Berkshire Hathaway Energy, insurance leaders, and major equity stakes in Occidental and Chevron.'
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 331.43,
    change: -0.86,
    category: 'Financials & Crypto',
    subsector: 'Global Banking',
    exchange: 'NYSE',
    marketCap: '$942.0B',
    thesis: 'Largest US money-center bank leading global investment banking, fixed income & commodities trading, and institutional asset management.'
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 328.90,
    change: 0.64,
    category: 'Financials & Crypto',
    subsector: 'Payment Networks',
    exchange: 'NYSE',
    marketCap: '$665.0B',
    thesis: 'Global digital payments network processing trillions in cross-border and domestic settlement volume across 200+ countries.'
  },
  {
    symbol: 'GS',
    name: 'The Goldman Sachs Group',
    price: 612.80,
    change: 1.42,
    category: 'Financials & Crypto',
    subsector: 'Investment Banking',
    exchange: 'NYSE',
    marketCap: '$194.0B',
    thesis: 'Premier global M&A advisor, commodities & equities market maker, and institutional wealth manager benefiting from deregulatory capital cycles.'
  },
  {
    symbol: 'COIN',
    name: 'Coinbase Global, Inc.',
    price: 208.93,
    change: 3.85,
    category: 'Financials & Crypto',
    subsector: 'Digital Assets',
    exchange: 'NASDAQ',
    marketCap: '$55.2B',
    thesis: 'Largest regulated US cryptocurrency exchange, institutional ETF custodian, and Base Layer-2 blockchain operator.'
  },
  {
    symbol: 'MSTR',
    name: 'Strategy (MicroStrategy)',
    price: 146.44,
    change: 4.52,
    category: 'Financials & Crypto',
    subsector: 'Bitcoin Treasury',
    exchange: 'NASDAQ',
    marketCap: '$49.2B',
    thesis: 'World’s largest corporate holder of Bitcoin, pioneering institutional digital capital markets and AI business intelligence software.'
  },

  // ─── DEFENSE, NUCLEAR & INDUSTRIALS ──────────────────────────────────────────
  {
    symbol: 'GE',
    name: 'GE Aerospace',
    price: 218.40,
    change: 1.67,
    category: 'Defense & Industrial',
    subsector: 'Aerospace & Defense',
    exchange: 'NYSE',
    marketCap: '$236.0B',
    thesis: 'Dominant commercial and military aircraft jet engine manufacturer with high-margin long-term propulsion service agreements.'
  },
  {
    symbol: 'CAT',
    name: 'Caterpillar Inc.',
    price: 418.50,
    change: 1.28,
    category: 'Defense & Industrial',
    subsector: 'Heavy Machinery & Energy',
    exchange: 'NYSE',
    marketCap: '$201.0B',
    thesis: 'Global industrial bellwether supplying mining trucks, oil & gas reciprocating engines, solar turbines, and data center backup generators.'
  },
  {
    symbol: 'RTX',
    name: 'RTX Corporation',
    price: 142.75,
    change: 0.95,
    category: 'Defense & Industrial',
    subsector: 'Aerospace & Defense',
    exchange: 'NYSE',
    marketCap: '$189.0B',
    thesis: 'Defense prime contractor behind Raytheon Patriot missile defense, Collins Aerospace avionics, and Pratt & Whitney engines.'
  },
  {
    symbol: 'LMT',
    name: 'Lockheed Martin Corp.',
    price: 584.20,
    change: 1.14,
    category: 'Defense & Industrial',
    subsector: 'Aerospace & Defense',
    exchange: 'NYSE',
    marketCap: '$139.0B',
    thesis: 'Prime defense contractor manufacturing the F-35 Lightning II fighter jet, Sikorsky helicopters, hypersonics, and space defense systems.'
  },
  {
    symbol: 'CCJ',
    name: 'Cameco Corporation',
    price: 64.30,
    change: 2.74,
    category: 'Defense & Industrial',
    subsector: 'Nuclear & Uranium',
    exchange: 'NYSE',
    marketCap: '$28.0B',
    thesis: 'Tier-one Western uranium miner and co-owner of Westinghouse Electric, powering the global nuclear baseload energy renaissance.'
  },

  // ─── HEALTHCARE & CONSUMER LEADERS ───────────────────────────────────────────
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    price: 942.10,
    change: 1.54,
    category: 'Healthcare & Consumer',
    subsector: 'Biopharmaceuticals',
    exchange: 'NYSE',
    marketCap: '$895.0B',
    thesis: 'World’s most valuable pharmaceutical company leading metabolic health (Mounjaro, Zepbound), oncology, and neuroscience therapeutics.'
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    price: 98.65,
    change: 0.82,
    category: 'Healthcare & Consumer',
    subsector: 'Global Retail',
    exchange: 'NYSE',
    marketCap: '$792.0B',
    thesis: 'Largest global omnichannel retailer leveraging automated supply chains, e-commerce marketplace scale, and high-margin retail media.'
  },
  {
    symbol: 'UNH',
    name: 'UnitedHealth Group Inc.',
    price: 568.40,
    change: 0.48,
    category: 'Healthcare & Consumer',
    subsector: 'Healthcare Services',
    exchange: 'NYSE',
    marketCap: '$524.0B',
    thesis: 'Diversified healthcare leader combining UnitedHealthcare benefits coverage with Optum care delivery, pharmacy, and data analytics.'
  },
  {
    symbol: 'COST',
    name: 'Costco Wholesale Corp.',
    price: 985.40,
    change: 1.05,
    category: 'Healthcare & Consumer',
    subsector: 'Global Retail',
    exchange: 'NASDAQ',
    marketCap: '$436.0B',
    thesis: 'Global membership warehouse leader with industry-leading renewal rates, Kirkland Signature private label, and resilient cash flows.'
  }
]

export const STOCK_BY_SYMBOL = Object.fromEntries(STOCKS.map(stock => [stock.symbol, stock]))
