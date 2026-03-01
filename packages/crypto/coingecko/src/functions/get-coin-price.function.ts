import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetCoinPriceInput = z.object({
  coinIds: z.array(z.string()).describe('Coin IDs (e.g. ["bitcoin", "ethereum"])'),
  currencies: z.array(z.string()).describe('Quote currencies (e.g. ["usd", "eur"])'),
  includeMarketCap: z.boolean().optional().describe('Include market cap'),
  include24hrVol: z.boolean().optional().describe('Include 24hr volume'),
  include24hrChange: z.boolean().optional().describe('Include 24hr change'),
})

export const GetCoinPriceOutput = z.object({
  prices: z.any().describe('Price data keyed by coin ID'),
})

export const getCoinPrice = pikkuSessionlessFunc({
  description: 'Get current price of cryptocurrencies',
  input: GetCoinPriceInput,
  output: GetCoinPriceOutput,
  node: { displayName: 'Get Coin Price', category: 'Crypto', type: 'action' },
  func: async (_services, { coinIds, currencies, includeMarketCap, include24hrVol, include24hrChange }) => {
    const params = new URLSearchParams({
      ids: coinIds.join(','),
      vs_currencies: currencies.join(','),
    })
    if (includeMarketCap) params.set('include_market_cap', 'true')
    if (include24hrVol) params.set('include_24hr_vol', 'true')
    if (include24hrChange) params.set('include_24hr_change', 'true')

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?${params}`)
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
    }
    const prices = await response.json()
    return { prices }
  },
})
