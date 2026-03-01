import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetMarketChartInput = z.object({
  coinId: z.string().describe('Coin ID (e.g. "bitcoin")'),
  currency: z.string().describe('Quote currency (e.g. "usd")'),
  days: z.union([z.number(), z.literal('max')]).describe('Number of days (1, 7, 14, 30, 90, 180, 365, or "max")'),
})

export const GetMarketChartOutput = z.object({
  prices: z.array(z.array(z.number())).describe('Price data as [timestamp, price] pairs'),
  marketCaps: z.array(z.array(z.number())).describe('Market cap data as [timestamp, value] pairs'),
  totalVolumes: z.array(z.array(z.number())).describe('Volume data as [timestamp, value] pairs'),
})

export const getMarketChart = pikkuSessionlessFunc({
  description: 'Get historical market data (price, market cap, volume) for a coin',
  input: GetMarketChartInput,
  output: GetMarketChartOutput,
  node: { displayName: 'Get Market Chart', category: 'Crypto', type: 'action' },
  func: async (_services, { coinId, currency, days }) => {
    const params = new URLSearchParams({
      vs_currency: currency,
      days: String(days),
    })

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}/market_chart?${params}`)
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return {
      prices: data.prices,
      marketCaps: data.market_caps,
      totalVolumes: data.total_volumes,
    }
  },
})
