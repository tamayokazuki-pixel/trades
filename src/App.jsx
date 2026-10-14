import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Flame,
  Globe2,
  Landmark,
  Menu,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  X
} from 'lucide-react'
import { isSupabaseReady, supabase } from './lib/supabase'
import { CATEGORIES, STOCKS } from './data/stocks'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function Logo() {
  return (
    <a className="logo" href="#top">
      <span className="logo-mark">
        R<span>1</span>
      </span>
      <span>
        RESERVE
        <br />
        ONE
      </span>
    </a>
  )
}

function Toast({ text }) {
  return text ? (
    <div className="toast">
      <Check size={15} />
      {text}
    </div>
  ) : null
}

function App() {
  const [market, setMarket] = useState(STOCKS)
  const [activeCategory, setActiveCategory] = useState('All Markets')
  const [activeSubsector, setActiveSubsector] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedSymbol, setSelectedSymbol] = useState('XOM')
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('r1_watchlist')
      return saved ? JSON.parse(saved) : ['XOM', 'CVX', 'DJT', 'ABTC', 'UMAC', 'NVDA']
    } catch {
      return ['XOM', 'CVX', 'DJT', 'ABTC', 'UMAC', 'NVDA']
    }
  })
  const [lookupSymbol, setLookupSymbol] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [auth, setAuth] = useState(false)
  const [signedInUser, setSignedInUser] = useState(null)
  const [menu, setMenu] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/market')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length) setMarket(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSignedInUser(data.session?.user || null)
    })
    const { data } = supabase.auth.onAuthStateChange((_, s) => {
      setSignedInUser(s?.user || null)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('r1_watchlist', JSON.stringify(watchlist))
    } catch {
      // ignore storage errors
    }
  }, [watchlist])

  function notice(t) {
    setToast(t)
    setTimeout(() => setToast(''), 2800)
  }

  function toggleWatchlist(symbol, e) {
    if (e) e.stopPropagation()
    setWatchlist(prev => {
      const exists = prev.includes(symbol)
      const next = exists ? prev.filter(s => s !== symbol) : [...prev, symbol]
      notice(exists ? `${symbol} removed from watchlist` : `${symbol} added to watchlist`)
      return next
    })
  }

  async function handleCustomLookup(e) {
    e.preventDefault()
    const clean = lookupSymbol.trim().toUpperCase().replace(/[^A-Z.-]/g, '').slice(0, 10)
    if (!clean) return
    const existing = market.find(item => item.symbol === clean)
    if (existing) {
      setSelectedSymbol(existing.symbol)
      setActiveCategory('All Markets')
      setActiveSubsector('All')
      setSearch(existing.symbol)
      setLookupSymbol('')
      notice(`Loaded ${existing.symbol} (${existing.name})`)
      return
    }
    setLookupLoading(true)
    try {
      const res = await fetch(`/api/quote/${encodeURIComponent(clean)}`)
      if (!res.ok) throw new Error('Lookup failed')
      const quoteData = await res.json()
      setMarket(prev => [quoteData, ...prev.filter(x => x.symbol !== quoteData.symbol)])
      setSelectedSymbol(quoteData.symbol)
      setActiveCategory('All Markets')
      setActiveSubsector('All')
      setSearch(quoteData.symbol)
      setLookupSymbol('')
      notice(`Added live quote for ${quoteData.symbol}`)
    } catch {
      notice(`Could not fetch quote for ${clean}`)
    } finally {
      setLookupLoading(false)
    }
  }

  const categoryCounts = useMemo(() => {
    const counts = { 'All Markets': market.length, Watchlist: watchlist.length }
    for (const c of CATEGORIES) {
      if (c !== 'All Markets') {
        counts[c] = market.filter(s => s.category === c).length
      }
    }
    return counts
  }, [market, watchlist])

  const availableSubsectors = useMemo(() => {
    const pool =
      activeCategory === 'All Markets'
        ? market
        : activeCategory === 'Watchlist'
          ? market.filter(s => watchlist.includes(s.symbol))
          : market.filter(s => s.category === activeCategory)
    const set = new Set(pool.map(s => s.subsector).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [market, activeCategory, watchlist])

  const filteredMarket = useMemo(() => {
    let rows = market
    if (activeCategory === 'Watchlist') {
      rows = rows.filter(s => watchlist.includes(s.symbol))
    } else if (activeCategory !== 'All Markets') {
      rows = rows.filter(s => s.category === activeCategory)
    }
    if (activeSubsector !== 'All') {
      rows = rows.filter(s => s.subsector === activeSubsector)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(
        s =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          (s.subsector && s.subsector.toLowerCase().includes(q)) ||
          (s.category && s.category.toLowerCase().includes(q)) ||
          (s.trumpLink && s.trumpLink.toLowerCase().includes(q)) ||
          (s.thesis && s.thesis.toLowerCase().includes(q))
      )
    }
    if (sortBy === 'price-desc') return [...rows].sort((a, b) => b.price - a.price)
    if (sortBy === 'price-asc') return [...rows].sort((a, b) => a.price - b.price)
    if (sortBy === 'change-desc') return [...rows].sort((a, b) => b.change - a.change)
    if (sortBy === 'change-asc') return [...rows].sort((a, b) => a.change - b.change)
    if (sortBy === 'symbol') return [...rows].sort((a, b) => a.symbol.localeCompare(b.symbol))
    return rows
  }, [market, activeCategory, activeSubsector, search, sortBy, watchlist])

  const selectedStock = useMemo(() => {
    return market.find(s => s.symbol === selectedSymbol) || filteredMarket[0] || market[0]
  }, [market, selectedSymbol, filteredMarket])

  const oilStocks = useMemo(() => market.filter(s => s.category === 'Oil & Energy'), [market])
  const trumpStocks = useMemo(() => market.filter(s => s.category === 'Trump Stocks'), [market])

  function selectAndFocusStock(symbol, categoryFilter) {
    setSelectedSymbol(symbol)
    if (categoryFilter) {
      setActiveCategory(categoryFilter)
      setActiveSubsector('All')
    }
    const el = document.querySelector('#markets')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div id="top">
      <Toast text={toast} />
      <div className="ticker">
        <div>
          {[...market.slice(0, 28), ...market.slice(0, 28)].map((q, i) => (
            <span key={i} onClick={() => selectAndFocusStock(q.symbol)} style={{ cursor: 'pointer' }}>
              <b>{q.symbol}</b> {fmt.format(q.price)}{' '}
              <em className={q.change >= 0 ? 'up' : 'down'}>
                {q.change >= 0 ? '+' : ''}
                {Number(q.change).toFixed(2)}%
              </em>
            </span>
          ))}
        </div>
      </div>

      <header>
        <Logo />
        <nav className={menu ? 'open' : ''}>
          <a href="#markets" onClick={() => setMenu(false)}>
            Markets ({market.length})
          </a>
          <a
            href="#markets"
            onClick={() => {
              setActiveCategory('Oil & Energy')
              setActiveSubsector('All')
              setMenu(false)
            }}
          >
            Oil &amp; Energy ({oilStocks.length})
          </a>
          <a href="#trump-desk" onClick={() => setMenu(false)}>
            Trump Stocks ({trumpStocks.length})
          </a>
          <a href="#network" onClick={() => setMenu(false)}>
            Network
          </a>
          <a href="#briefings" onClick={() => setMenu(false)}>
            Briefings
          </a>
        </nav>
        <div className="header-actions">
          <button className="text-btn" onClick={() => setAuth(true)}>
            {signedInUser ? signedInUser.email.split('@')[0] : 'Sign in'}
          </button>
          <button
            className="primary small"
            onClick={() => document.querySelector('#markets').scrollIntoView({ behavior: 'smooth' })}
          >
            Open terminal <ArrowUpRight size={15} />
          </button>
          <button className="menu" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">
            GLOBAL ENERGY, POLICY &amp; MULTI-SECTOR DESK <i /> MARKET SESSION 042
          </div>
          <h1>
            Clarity for the world’s
            <br />
            <em>energy &amp; policy markets.</em>
          </h1>
          <p>
            Institutional-grade market intelligence covering {oilStocks.length} global oil &amp; gas leaders,{' '}
            {trumpStocks.length} Trump-ecosystem &amp; policy-sensitive equities, and premier mega-cap benchmarks
            across technology, defense, financials, and digital assets.
          </p>
          <div className="hero-actions">
            <a
              href="#markets"
              className="primary"
              onClick={() => {
                setActiveCategory('Oil & Energy')
                setActiveSubsector('All')
              }}
            >
              Explore Oil &amp; Energy ({oilStocks.length}) <Flame size={17} />
            </a>
            <a
              href="#trump-desk"
              className="primary secondary-cta"
              onClick={() => {
                setActiveCategory('Trump Stocks')
                setActiveSubsector('All')
              }}
            >
              Trump Stocks Desk ({trumpStocks.length}) <Landmark size={17} />
            </a>
            <a
              href="#markets"
              className="link"
              onClick={() => {
                setActiveCategory('All Markets')
                setActiveSubsector('All')
              }}
            >
              View all {market.length} equities <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="hero-foot">
            <span>
              <ShieldCheck /> {market.length} LIVE &amp; BENCHMARK INSTRUMENTS
            </span>
            <span>
              <Flame /> {oilStocks.length} OIL, GAS, REFINING &amp; LNG EQUITIES
            </span>
            <span>
              <Landmark /> {trumpStocks.length} TRUMP ECOSYSTEM &amp; POLICY STOCKS
            </span>
            <span>
              <BarChart3 /> MULTI-SECTOR INSTITUTIONAL COVERAGE
            </span>
          </div>
        </section>

        <section className="terminal" id="markets">
          <div className="section-head">
            <div>
              <span className="kicker">01 / MULTI-SECTOR MARKET TERMINAL</span>
              <h2>Opportunity, clearly measured.</h2>
            </div>
            <p>
              Filter across global Oil &amp; Energy supermajors, Permian E&amp;P, midstream pipelines, refining,
              Trump-linked equities, AI mega-caps, defense primes, and digital asset leaders.
            </p>
          </div>

          <div className="terminal-controls">
            <div className="category-tabs" role="tablist">
              {[...CATEGORIES, 'Watchlist'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-tab ${activeCategory === cat ? 'active' : ''} ${
                    cat === 'Trump Stocks' ? 'trump-tab' : ''
                  }`}
                  onClick={() => {
                    setActiveCategory(cat)
                    setActiveSubsector('All')
                  }}
                >
                  {cat === 'Watchlist' && <Star size={12} />}
                  <span>{cat}</span>
                  <small>{categoryCounts[cat] ?? 0}</small>
                </button>
              ))}
            </div>

            {availableSubsectors.length > 2 && (
              <div className="subsector-bar">
                <span className="subsector-label">SUBSECTOR:</span>
                {availableSubsectors.map(sub => (
                  <button
                    key={sub}
                    type="button"
                    className={`sub-pill ${activeSubsector === sub ? 'active' : ''}`}
                    onClick={() => setActiveSubsector(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            <div className="filter-bar">
              <div className="search-box">
                <Search size={15} />
                <input
                  type="search"
                  placeholder="Search symbol, company, Permian, LNG, Trump Jr., Truth Social, AI…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button type="button" className="clear-search" onClick={() => setSearch('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="sort-box">
                <label htmlFor="sort-select">SORT BY</label>
                <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="default">Sector Weight</option>
                  <option value="change-desc">24H Gainers (%)</option>
                  <option value="change-asc">24H Losers (%)</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="symbol">Ticker: A → Z</option>
                </select>
              </div>

              <form className="lookup-form" onSubmit={handleCustomLookup}>
                <input
                  type="text"
                  placeholder="Fetch any ticker (e.g. HES,oxy)"
                  value={lookupSymbol}
                  onChange={e => setLookupSymbol(e.target.value)}
                />
                <button type="submit" disabled={lookupLoading}>
                  {lookupLoading ? 'Fetching…' : 'Lookup Quote'}
                </button>
              </form>
            </div>
          </div>

          <div className="market-layout research-layout">
            <div className="table-card">
              <div className="table-title">
                <span>
                  {activeCategory.toUpperCase()}
                  {activeSubsector !== 'All' ? ` · ${activeSubsector.toUpperCase()}` : ''} ({filteredMarket.length}{' '}
                  INSTRUMENTS)
                </span>
                <span className="live">
                  <i /> LIVE FEED
                </span>
              </div>
              <div className="table-row table-header">
                <span>INSTRUMENT</span>
                <span>SECTOR / DESK</span>
                <span>MKT CAP</span>
                <span>LAST</span>
                <span>24H</span>
                <span>WATCH</span>
              </div>
              <div className="table-scroll">
                {filteredMarket.length ? (
                  filteredMarket.map(q => {
                    const isSelected = selectedStock?.symbol === q.symbol
                    const isWatched = watchlist.includes(q.symbol)
                    return (
                      <div
                        className={`table-row interactive-row ${isSelected ? 'selected-row' : ''}`}
                        key={q.symbol}
                        onClick={() => setSelectedSymbol(q.symbol)}
                      >
                        <span className="instrument-cell">
                          <b>{q.symbol}</b>
                          <small>{q.name}</small>
                        </span>
                        <span className="sector-cell">
                          <span
                            className={`badge ${
                              q.category === 'Trump Stocks'
                                ? 'badge-trump'
                                : q.category === 'Oil & Energy'
                                  ? 'badge-oil'
                                  : 'badge-sector'
                            }`}
                          >
                            {q.subsector || q.category}
                          </span>
                        </span>
                        <span className="mcap-cell">{q.marketCap || '—'}</span>
                        <strong>{fmt.format(q.price)}</strong>
                        <em className={q.change >= 0 ? 'up' : 'down'}>
                          {q.change >= 0 ? '+' : ''}
                          {Number(q.change).toFixed(2)}%
                        </em>
                        <span className="action-cell">
                          <button
                            type="button"
                            className={`star-btn ${isWatched ? 'watched' : ''}`}
                            onClick={e => toggleWatchlist(q.symbol, e)}
                            title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                          >
                            <Star size={14} fill={isWatched ? 'currentColor' : 'none'} />
                          </button>
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <div className="empty-table">
                    No instruments match your current filter.{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory('All Markets')
                        setActiveSubsector('All')
                        setSearch('')
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <aside className="portfolio research-panel">
              {selectedStock && (
                <div className="dossier-card">
                  <div className="dossier-top">
                    <span className="kicker">INSTRUMENT DOSSIER · {selectedStock.exchange || 'US'}</span>
                    <button
                      type="button"
                      className={`watchlist-pill ${watchlist.includes(selectedStock.symbol) ? 'active' : ''}`}
                      onClick={() => toggleWatchlist(selectedStock.symbol)}
                    >
                      <Star
                        size={12}
                        fill={watchlist.includes(selectedStock.symbol) ? 'currentColor' : 'none'}
                      />
                      {watchlist.includes(selectedStock.symbol) ? 'WATCHING' : 'WATCH'}
                    </button>
                  </div>

                  <div className="dossier-header">
                    <div>
                      <h3>{selectedStock.symbol}</h3>
                      <span className="dossier-name">{selectedStock.name}</span>
                    </div>
                    <div className="dossier-price">
                      <strong>{fmt.format(selectedStock.price)}</strong>
                      <em className={selectedStock.change >= 0 ? 'up' : 'down'}>
                        {selectedStock.change >= 0 ? '+' : ''}
                        {Number(selectedStock.change).toFixed(2)}% (24H)
                      </em>
                    </div>
                  </div>

                  <div className="dossier-badges">
                    <span
                      className={`badge ${
                        selectedStock.category === 'Trump Stocks'
                          ? 'badge-trump'
                          : selectedStock.category === 'Oil & Energy'
                            ? 'badge-oil'
                            : 'badge-sector'
                      }`}
                    >
                      {selectedStock.category}
                    </span>
                    {selectedStock.subsector && (
                      <span className="badge badge-outline">{selectedStock.subsector}</span>
                    )}
                  </div>

                  {selectedStock.trumpLink && (
                    <div className="trump-callout">
                      <span>TRUMP ECOSYSTEM / POLICY CONNECTION</span>
                      <strong>{selectedStock.trumpLink}</strong>
                    </div>
                  )}

                  <p className="dossier-thesis">{selectedStock.thesis}</p>

                  <div className="metric">
                    <span>Market capitalization</span>
                    <b>{selectedStock.marketCap || '—'}</b>
                  </div>
                  <div className="metric">
                    <span>Primary listing</span>
                    <b>{selectedStock.exchange || 'NYSE / NASDAQ'}</b>
                  </div>
                  <div className="metric">
                    <span>Category coverage</span>
                    <b>{selectedStock.category}</b>
                  </div>
                </div>
              )}

              <div className="rule" />
              <span className="kicker">DESK SUMMARY</span>
              <div className="metric">
                <span>Total equities tracked</span>
                <b>{market.length}</b>
              </div>
              <div className="metric">
                <span>Oil &amp; Energy leaders</span>
                <b>{oilStocks.length}</b>
              </div>
              <div className="metric">
                <span>Trump ecosystem stocks</span>
                <b>{trumpStocks.length}</b>
              </div>
              <div className="metric">
                <span>Data feed status</span>
                <b className="up">CONNECTED</b>
              </div>
            </aside>
          </div>
        </section>

        <section className="trump-section" id="trump-desk">
          <div className="section-head">
            <div>
              <span className="kicker">02 / TRUMP ECOSYSTEM &amp; POLICY DESK</span>
              <h2>
                Trump-linked equities &amp;
                <br />
                <em>policy catalysts.</em>
              </h2>
            </div>
            <p>
              Comprehensive tracking of companies founded by President Donald Trump, co-founded or advised by Donald
              Trump Jr. and Eric Trump, campaign &amp; cloud partners, and core America-First industrial and border
              policy beneficiaries.
            </p>
          </div>

          <div className="trump-grid">
            {trumpStocks.map(stock => (
              <article
                key={stock.symbol}
                className={`trump-card ${selectedStock?.symbol === stock.symbol ? 'active' : ''}`}
                onClick={() => selectAndFocusStock(stock.symbol, 'Trump Stocks')}
              >
                <div className="trump-card-top">
                  <div>
                    <span className="trump-symbol">{stock.symbol}</span>
                    <small className="trump-exchange">{stock.exchange}</small>
                  </div>
                  <span className="badge badge-trump">{stock.subsector}</span>
                </div>
                <h3>{stock.name}</h3>
                <div className="trump-link-tag">
                  <Landmark size={13} />
                  <span>{stock.trumpLink}</span>
                </div>
                <p>{stock.thesis}</p>
                <div className="trump-card-foot">
                  <div>
                    <span>LAST PRICE</span>
                    <strong>{fmt.format(stock.price)}</strong>
                  </div>
                  <div>
                    <span>24H CHANGE</span>
                    <em className={stock.change >= 0 ? 'up' : 'down'}>
                      {stock.change >= 0 ? '+' : ''}
                      {Number(stock.change).toFixed(2)}%
                    </em>
                  </div>
                  <div>
                    <span>MKT CAP</span>
                    <b>{stock.marketCap}</b>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="network" id="network">
          <div className="section-head light">
            <div>
              <span className="kicker">03 / GLOBAL OIL &amp; ENERGY NETWORK</span>
              <h2>
                A coordinated view of
                <br />
                <em>global energy.</em>
              </h2>
            </div>
            <p>
              One operating picture across {oilStocks.length} listed energy instruments—spanning upstream supermajors,
              Permian shale E&amp;P, oilfield services, Gulf Coast refining, and North American LNG &amp; pipeline
              infrastructure.
            </p>
          </div>
          <div className="network-grid">
            <div className="map">
              <div className="orbit o1" />
              <div className="orbit o2" />
              <div className="core">
                R1
                <small>GLOBAL NEXUS</small>
              </div>
              {['AMERICAS', 'WEST AFRICA', 'GULF', 'ASIA PACIFIC'].map((x, i) => (
                <span className={`pin p${i + 1}`} key={x}>
                  {x}
                  <i />
                </span>
              ))}
            </div>
            <div className="allocation">
              <span className="kicker">ENERGY &amp; POLICY SLEEVES</span>
              <h3>Coverage architecture</h3>
              {[
                ['Integrated Oil Majors (XOM, CVX, SHEL, TTE, BP…)', 34],
                ['Permian & North American E&P (COP, EOG, OXY, FANG…)', 26],
                ['Midstream, LNG & Refining (ENB, WMB, MPC, VLO, LNG…)', 22],
                ['Trump Ecosystem & Policy Catalysts (DJT, ABTC, UMAC…)', 18]
              ].map(([x, n]) => (
                <div className="bar" key={x}>
                  <div>
                    <span>{x}</span>
                    <b>{n}%</b>
                  </div>
                  <i>
                    <span style={{ width: `${n}%` }} />
                  </i>
                </div>
              ))}
              <small>Illustrative institutional coverage breakdown · Not investment advice</small>
            </div>
          </div>
        </section>

        <section className="stats" id="mandate">
          <span className="kicker">04 / SYSTEM OVERVIEW</span>
          <h2>
            Built for conviction.
            <br />
            Governed by discipline.
          </h2>
          <div className="stat-grid">
            <div>
              <span>REFERENCE 01</span>
              <strong>{market.length}</strong>
              <h3>Tracked equities</h3>
              <p>Oil, Trump ecosystem &amp; global blue-chips</p>
            </div>
            <div>
              <span>REFERENCE 02</span>
              <strong>{oilStocks.length}</strong>
              <h3>Oil &amp; Energy stocks</h3>
              <p>Upstream, midstream, refining &amp; LNG</p>
            </div>
            <div>
              <span>REFERENCE 03</span>
              <strong>{trumpStocks.length}</strong>
              <h3>Trump stocks</h3>
              <p>DJT, ABTC, UMAC, DOMH, PSQH, RUM &amp; policy plays</p>
            </div>
            <div>
              <span>REFERENCE 04</span>
              <strong>6</strong>
              <h3>Market sectors</h3>
              <p>Energy · Trump · Tech · Finance · Defense · Health</p>
            </div>
          </div>
        </section>

        <section className="briefings" id="briefings">
          <div>
            <span className="kicker">05 / INTELLIGENCE</span>
            <h2>Reports &amp; briefings</h2>
          </div>
          {[
            ['Oil supermajors & Permian Basin consolidation — Q4 outlook', 'Energy Desk · 24 pages', 'Oil & Energy'],
            [
              'Trump ecosystem equities: DJT, American Bitcoin (ABTC), UMAC & DOMH analysis',
              'Policy & Catalyst Desk · 19 pages',
              'Trump Stocks'
            ],
            [
              'US LNG export capacity, pipeline bottlenecks & AI data-center power demand',
              'Midstream & Power Note · 16 pages',
              'Oil & Energy'
            ],
            [
              'America-First industrial policy: domestic steel, rare earths & defense primes',
              'Macro Strategy · 14 pages',
              'Defense & Industrial'
            ]
          ].map(([title, meta, cat], i) => (
            <a
              href="#markets"
              key={title}
              onClick={() => {
                setActiveCategory(cat)
                setActiveSubsector('All')
                notice(`Filtered terminal to ${cat} for briefing`)
              }}
            >
              <span>0{i + 1}</span>
              <b>{title}</b>
              <small>{meta}</small>
              <ArrowUpRight />
            </a>
          ))}
        </section>
      </main>

      <footer>
        <Logo />
        <p>Independent market intelligence across global energy, Trump-ecosystem equities, and sector leaders.</p>
        <div>
          <a href="#markets">Markets</a>
          <a href="#trump-desk">Trump Desk</a>
          <a href="#mandate">Disclosures</a>
          <a href="mailto:desk@reserveone.io">Contact</a>
        </div>
        <small>© 2026 RESERVE ONE · MARKET DATA MAY BE DELAYED · FOR INFORMATIONAL USE</small>
      </footer>

      {auth && (
        <AuthModal
          onClose={() => setAuth(false)}
          signedIn={Boolean(signedInUser) && isSupabaseReady}
          notice={notice}
        />
      )}
    </div>
  )
}

function AuthModal({ onClose, signedIn, notice }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  async function signIn(e) {
    e.preventDefault()
    if (!isSupabaseReady) {
      notice('Add Supabase environment variables to enable cloud sign-in')
      onClose()
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin }
    })
    setLoading(false)
    if (error) notice(error.message)
    else {
      notice('Check your email for the secure sign-in link')
      onClose()
    }
  }
  return (
    <div className="modal-bg">
      <form className="modal auth" onSubmit={signIn}>
        <button type="button" className="close" onClick={onClose}>
          <X />
        </button>
        <Logo />
        <span className="kicker">SECURE MEMBER ACCESS</span>
        <h2>{signedIn ? 'Welcome back' : 'Enter the market desk.'}</h2>
        <p>Use a secure magic link—no password required.</p>
        <label>
          EMAIL ADDRESS
          <input
            required
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <button className="primary full" disabled={loading}>
          {loading ? 'Sending…' : 'Continue with email'} <ArrowRight />
        </button>
        <small>{isSupabaseReady ? 'Protected by Supabase Auth' : 'Demo mode · Connect Supabase to enable sign-in'}</small>
      </form>
    </div>
  )
}

export default App
