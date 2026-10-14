import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const symbols = ['XOM', 'CVX', 'COP', 'OXY', 'SLB', 'SHEL']
const fallback = {
  XOM: { name: 'Exxon Mobil', price: 119.42, change: 0.86 }, CVX: { name: 'Chevron', price: 156.28, change: -0.34 },
  COP: { name: 'ConocoPhillips', price: 103.67, change: 1.21 }, OXY: { name: 'Occidental', price: 46.91, change: 0.48 },
  SLB: { name: 'SLB', price: 43.76, change: -0.17 }, SHEL: { name: 'Shell', price: 72.14, change: 0.65 }
}
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(compression())
app.use(express.json())

async function quote(symbol) {
  const item = fallback[symbol] || { name: symbol, price: 100, change: 0 }
  if (!process.env.FINNHUB_API_KEY) return { symbol, ...item, demo: true }
  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${process.env.FINNHUB_API_KEY}`)
    if (!response.ok) throw new Error('Provider error')
    const q = await response.json()
    return { symbol, name: item.name, price: q.c || item.price, change: q.dp ?? item.change, demo: false }
  } catch { return { symbol, ...item, demo: true } }
}
app.get('/api/health', (_, res) => res.json({ ok: true }))
app.get('/api/market', async (_, res) => res.json(await Promise.all(symbols.map(quote))))
app.get('/api/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase().replace(/[^A-Z.-]/g, '').slice(0, 10)
  if (!symbol) return res.status(400).json({ error: 'Invalid symbol' })
  res.json(await quote(symbol))
})

const dist = path.resolve(__dirname, '../dist')
app.use(express.static(dist))
app.get('*splat', (_, res) => res.sendFile(path.join(dist, 'index.html')))
app.listen(port, '0.0.0.0', () => console.log(`Reserve One listening on ${port}`))
