import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetCoinListInput = z.object({
  includePlatform: z.boolean().optional().describe('Include platform contract addresses'),
})

export const GetCoinListOutput = z.object({
  coins: z.array(z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  })).describe('List of available coins'),
})

export const getCoinList = pikkuSessionlessFunc({
  description: 'Get list of all supported coins with id, name and symbol',
  input: GetCoinListInput,
  output: GetCoinListOutput,
  node: { displayName: 'Get Coin List', category: 'Crypto', type: 'action' },
  func: async (_services, { includePlatform }) => {
    const params = new URLSearchParams()
    if (includePlatform) params.set('include_platform', 'true')

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list?${params}`)
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`)
    }
    const coins = await response.json()
    return { coins }
  },
})
