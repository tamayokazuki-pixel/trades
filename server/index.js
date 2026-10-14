import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { STOCKS, STOCK_BY_SYMBOL } from '../src/data/stocks.js'

const app = express()
const port = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const quoteCache = new Map()
const CACHE_TTL_MS = 60_000

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(compression())
app.use(express.json())

async function quote(symbol) {
  const item = STOCK_BY_SYMBOL[symbol] || {
    symbol,
    name: `${symbol} Equity`,
    price: 100,
    change: 0,
    category: 'All Markets',
    subsector: 'Listed Equity',
    exchange: 'US Market',
    marketCap: '—',
    thesis: 'Live market instrument retrieved via the Reserve One institutional quote desk.'
  }

  if (!process.env.FINNHUB_API_KEY) {
    return { ...item, symbol, demo: true }
  }

  const cached = quoteCache.get(symbol)
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${process.env.FINNHUB_API_KEY}`
    )
    if (!response.ok) throw new Error('Provider error')
    const q = await response.json()
    const data = {
      ...item,
      symbol,
      price: q.c || item.price,
      change: q.dp ?? item.change,
      demo: !q.c
    }
    quoteCache.set(symbol, { ts: Date.now(), data })
    return data
  } catch {
    return { ...item, symbol, demo: true }
  }
}

app.get('/api/health', (_, res) => res.json({ ok: true, instruments: STOCKS.length }))

app.get('/api/market', async (req, res) => {
  const { category, q } = req.query
  let list = STOCKS
  if (category && category !== 'All Markets') {
    list = list.filter(s => s.category === category)
  }
  if (q) {
    const term = String(q).toLowerCase()
    list = list.filter(
      s =>
        s.symbol.toLowerCase().includes(term) ||
        s.name.toLowerCase().includes(term) ||
        s.subsector.toLowerCase().includes(term) ||
        (s.trumpLink && s.trumpLink.toLowerCase().includes(term))
    )
  }
  const results = await Promise.all(list.map(item => quote(item.symbol)))
  res.json(results)
})

app.get('/api/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase().replace(/[^A-Z.-]/g, '').slice(0, 10)
  if (!symbol) return res.status(400).json({ error: 'Invalid symbol' })
  res.json(await quote(symbol))
})

const dist = path.resolve(__dirname, '../dist')
app.use(express.static(dist))
app.get('*splat', (_, res) => res.sendFile(path.join(dist, 'index.html')))
app.listen(port, '0.0.0.0', () => console.log(`Reserve One listening on ${port}`))
