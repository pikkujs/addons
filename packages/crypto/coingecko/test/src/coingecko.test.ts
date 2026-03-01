import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('coingecko addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('getCoinPrice returns bitcoin price in usd', async () => {
    const result = await rpc.invoke('coingecko:getCoinPrice', {
      coinIds: ['bitcoin'],
      currencies: ['usd'],
    })
    assert.ok(result.prices.bitcoin)
    assert.ok(typeof result.prices.bitcoin.usd === 'number')
    assert.ok(result.prices.bitcoin.usd > 0)
  })

  await test('getCoinPrice supports multiple coins and currencies', async () => {
    const result = await rpc.invoke('coingecko:getCoinPrice', {
      coinIds: ['bitcoin', 'ethereum'],
      currencies: ['usd', 'eur'],
    })
    assert.ok(result.prices.bitcoin.usd)
    assert.ok(result.prices.bitcoin.eur)
    assert.ok(result.prices.ethereum.usd)
    assert.ok(result.prices.ethereum.eur)
  })

  await test('getCoinPrice with market cap', async () => {
    const result = await rpc.invoke('coingecko:getCoinPrice', {
      coinIds: ['bitcoin'],
      currencies: ['usd'],
      includeMarketCap: true,
    })
    assert.ok(result.prices.bitcoin.usd_market_cap !== undefined)
  })

  await test('getCoinList returns coins', async () => {
    const result = await rpc.invoke('coingecko:getCoinList', {})
    assert.ok(Array.isArray(result.coins))
    assert.ok(result.coins.length > 0)
    const btc = result.coins.find((c: any) => c.id === 'bitcoin')
    assert.ok(btc)
    assert.equal(btc.symbol, 'btc')
  })

  await test('getMarketChart returns price history', async () => {
    const result = await rpc.invoke('coingecko:getMarketChart', {
      coinId: 'bitcoin',
      currency: 'usd',
      days: 1,
    })
    assert.ok(Array.isArray(result.prices))
    assert.ok(result.prices.length > 0)
    assert.equal(result.prices[0].length, 2) // [timestamp, price]
    assert.ok(Array.isArray(result.marketCaps))
    assert.ok(Array.isArray(result.totalVolumes))
  })
})
