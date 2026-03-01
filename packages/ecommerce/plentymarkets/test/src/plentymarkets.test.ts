import '../.pikku/pikku-bootstrap.gen.js'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { PlentymarketsService } from '../../../../packages/ecommerce/plentymarkets/src/plentymarkets-api.service.js'
import { createSingletonServices } from './services.js'

/**
 * Simple mock PlentyMarkets REST API server.
 * Handles all endpoints used by the plentymarkets package functions.
 */
function createMockServer() {
  let nextId = 1000

  const paginated = <T>(entries: T[]) => ({
    page: 1,
    totalsCount: entries.length,
    isLastPage: true,
    lastPageNumber: 1,
    firstOnPage: 1,
    lastOnPage: entries.length,
    itemsPerPage: 25,
    entries,
  })

  const now = new Date().toISOString()

  // In-memory stores
  const orders: Record<number, any> = {}
  const items: Record<number, any> = {}
  const variations: Record<string, any> = {} // key: `${itemId}:${variationId}`
  const categories: Record<number, any> = {}
  const payments: Record<number, any> = {}
  const contacts: Record<number, any> = {}

  const warehouses: Record<number, any> = {
    1: { id: 1, name: 'Main Warehouse', typeId: 0, priority: 1, createdAt: now, updatedAt: now },
    2: { id: 2, name: 'Secondary Warehouse', typeId: 0, priority: 2, createdAt: now, updatedAt: now },
  }

  const stockEntries = [
    { itemId: 1, variationId: 100, warehouseId: 1, stockPhysical: 50, reservedStock: 5, stockNet: 45, updatedAt: now },
    { itemId: 2, variationId: 200, warehouseId: 1, stockPhysical: 100, reservedStock: 10, stockNet: 90, updatedAt: now },
  ]

  const server = http.createServer((req, res) => {
    const url = new URL(req.url!, `http://${req.headers.host}`)
    const path = url.pathname.replace('/rest', '')
    const method = req.method!

    // Verify auth header
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    let body = ''
    req.on('data', (chunk: Buffer) => { body += chunk.toString() })
    req.on('end', () => {
      const parsed = body ? JSON.parse(body) : {}
      let result: any
      let status = 200

      try {
        // ── Orders ──────────────────────────────
        if (path === '/orders' && method === 'GET') {
          result = paginated(Object.values(orders))
        } else if (path === '/orders' && method === 'POST') {
          const id = nextId++
          const order = { id, ...parsed, createdAt: now, updatedAt: now }
          orders[id] = order
          result = order
          status = 201
        } else if (path.match(/^\/orders\/\d+$/) && method === 'GET') {
          const id = Number(path.split('/')[2])
          result = orders[id]
          if (!result) { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/orders\/\d+$/) && method === 'PUT') {
          const id = Number(path.split('/')[2])
          if (orders[id]) {
            orders[id] = { ...orders[id], ...parsed, updatedAt: now }
            result = orders[id]
          } else { status = 404; result = { error: 'Not found' } }

        // ── Items ───────────────────────────────
        } else if (path === '/items' && method === 'GET') {
          result = paginated(Object.values(items))
        } else if (path === '/items' && method === 'POST') {
          const id = nextId++
          const item = { id, ...parsed, createdAt: now, updatedAt: now }
          items[id] = item
          result = item
          status = 201
        } else if (path.match(/^\/items\/\d+$/) && !path.includes('/variations') && method === 'GET') {
          const id = Number(path.split('/')[2])
          result = items[id]
          if (!result) { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/items\/\d+$/) && !path.includes('/variations') && method === 'PUT') {
          const id = Number(path.split('/')[2])
          if (items[id]) {
            items[id] = { ...items[id], ...parsed, updatedAt: now }
            result = items[id]
          } else { status = 404; result = { error: 'Not found' } }

        // ── Variations ──────────────────────────
        } else if (path.match(/^\/items\/\d+\/variations$/) && method === 'GET') {
          const itemId = Number(path.split('/')[2])
          const entries = Object.values(variations).filter((v: any) => v.itemId === itemId)
          result = paginated(entries)
        } else if (path.match(/^\/items\/\d+\/variations$/) && method === 'POST') {
          const itemId = Number(path.split('/')[2])
          const id = nextId++
          const variation = { id, itemId, ...parsed, createdAt: now, updatedAt: now }
          variations[`${itemId}:${id}`] = variation
          result = variation
          status = 201
        } else if (path.match(/^\/items\/\d+\/variations\/\d+$/) && method === 'GET') {
          const parts = path.split('/')
          const key = `${parts[2]}:${parts[4]}`
          result = variations[key]
          if (!result) { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/items\/\d+\/variations\/\d+$/) && method === 'PUT') {
          const parts = path.split('/')
          const key = `${parts[2]}:${parts[4]}`
          if (variations[key]) {
            variations[key] = { ...variations[key], ...parsed, updatedAt: now }
            result = variations[key]
          } else { status = 404; result = { error: 'Not found' } }

        // ── Categories ──────────────────────────
        } else if (path === '/categories' && method === 'GET') {
          result = paginated(Object.values(categories))
        } else if (path === '/categories' && method === 'POST') {
          const id = nextId++
          const category = { id, ...parsed, updatedAt: now }
          categories[id] = category
          result = category
          status = 201
        } else if (path.match(/^\/categories\/\d+$/) && method === 'GET') {
          const id = Number(path.split('/')[2])
          result = categories[id]
          if (!result) { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/categories\/\d+$/) && method === 'PUT') {
          const id = Number(path.split('/')[2])
          if (categories[id]) {
            categories[id] = { ...categories[id], ...parsed, updatedAt: now }
            result = categories[id]
          } else { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/categories\/\d+$/) && method === 'DELETE') {
          const id = Number(path.split('/')[2])
          delete categories[id]
          status = 204
          result = undefined

        // ── Warehouses (before stock to avoid path conflicts) ──
        } else if (path === '/stockmanagement/warehouses' && method === 'GET') {
          result = Object.values(warehouses)
        } else if (path.match(/^\/stockmanagement\/warehouses\/\d+$/) && method === 'GET') {
          const id = Number(path.split('/')[3])
          result = warehouses[id]
          if (!result) { status = 404; result = { error: 'Not found' } }

        // ── Stock ───────────────────────────────
        } else if (path === '/stockmanagement/stock' && method === 'GET') {
          result = paginated(stockEntries)
        } else if (path.match(/^\/stockmanagement\/warehouses\/\d+\/stock$/) && method === 'GET') {
          const warehouseId = Number(path.split('/')[3])
          const entries = stockEntries.filter(s => s.warehouseId === warehouseId)
          result = paginated(entries)
        } else if (path.match(/^\/stockmanagement\/warehouses\/\d+\/stock\/correction$/) && method === 'PUT') {
          status = 204
          result = undefined

        // ── Payments ────────────────────────────
        } else if (path === '/payments' && method === 'GET') {
          result = paginated(Object.values(payments))
        } else if (path === '/payments' && method === 'POST') {
          const id = nextId++
          const payment = { id, ...parsed, createdAt: now, updatedAt: now }
          payments[id] = payment
          result = payment
          status = 201
        } else if (path.match(/^\/payments\/\d+$/) && method === 'GET') {
          const id = Number(path.split('/')[2])
          result = payments[id]
          if (!result) { status = 404; result = { error: 'Not found' } }

        // ── Contacts ────────────────────────────
        } else if (path === '/accounts/contacts' && method === 'GET') {
          result = paginated(Object.values(contacts))
        } else if (path === '/accounts/contacts' && method === 'POST') {
          const id = nextId++
          const contact = { id, ...parsed, createdAt: now, updatedAt: now }
          contacts[id] = contact
          result = contact
          status = 201
        } else if (path.match(/^\/accounts\/contacts\/\d+$/) && method === 'GET') {
          const id = Number(path.split('/')[3])
          result = contacts[id]
          if (!result) { status = 404; result = { error: 'Not found' } }
        } else if (path.match(/^\/accounts\/contacts\/\d+$/) && method === 'PUT') {
          const id = Number(path.split('/')[3])
          if (contacts[id]) {
            contacts[id] = { ...contacts[id], ...parsed, updatedAt: now }
            result = contacts[id]
          } else { status = 404; result = { error: 'Not found' } }

        } else {
          status = 404
          result = { error: `Unknown route: ${method} ${path}` }
        }
      } catch (err: any) {
        status = 500
        result = { error: err.message }
      }

      if (status === 204) {
        res.writeHead(204)
        res.end()
      } else {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      }
    })
  })

  return server
}

function startServer(server: http.Server): Promise<string> {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address() as { port: number }
      resolve(`http://127.0.0.1:${addr.port}`)
    })
  })
}

function stopServer(server: http.Server): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => resolve())
  })
}

// ── Retry & throttle tests ─────────────────────────────────────

test('retries on 5xx and succeeds on second attempt', async () => {
  let attempt = 0
  const server = http.createServer((req, res) => {
    attempt++
    if (attempt === 1) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal Server Error' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify([]))
    }
  })

  const baseUrl = await startServer(server)
  try {
    const service = new PlentymarketsService({ baseUrl, accessToken: 'tok' })
    const result = await service.listWarehouses()
    assert.deepEqual(result, [])
    assert.equal(attempt, 2, 'should have made exactly 2 attempts')
  } finally {
    await stopServer(server)
  }
})

test('does not retry on 4xx', async () => {
  let attempt = 0
  const server = http.createServer((req, res) => {
    attempt++
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Bad Request' }))
  })

  const baseUrl = await startServer(server)
  try {
    const service = new PlentymarketsService({ baseUrl, accessToken: 'tok' })
    await assert.rejects(
      () => service.listWarehouses(),
      (err: Error) => {
        assert.match(err.message, /400/)
        return true
      }
    )
    assert.equal(attempt, 1, 'should have made exactly 1 attempt')
  } finally {
    await stopServer(server)
  }
})

test('throttles when rate-limit headers indicate calls exhausted', async () => {
  let requestCount = 0
  const server = http.createServer((req, res) => {
    requestCount++
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (requestCount === 1) {
      headers['X-Plenty-Global-Short-Period-Calls-Left'] = '1'
      headers['X-Plenty-Global-Short-Period-Decay'] = '1'
    }
    res.writeHead(200, headers)
    res.end(JSON.stringify([]))
  })

  const baseUrl = await startServer(server)
  try {
    const service = new PlentymarketsService({ baseUrl, accessToken: 'tok' })

    // First request — sets the throttle
    await service.listWarehouses()

    // Second request — should be delayed by ~1s
    const start = Date.now()
    await service.listWarehouses()
    const elapsed = Date.now() - start

    assert.ok(elapsed >= 900, `expected ≥900ms delay, got ${elapsed}ms`)
    assert.equal(requestCount, 2)
  } finally {
    await stopServer(server)
  }
})

test('plentymarkets external package', async () => {
  const server = createMockServer()
  const baseUrl = await startServer(server)
  console.log(`\n  Mock PlentyMarkets API at ${baseUrl}`)

  try {
    const secrets = new LocalSecretService()
    await secrets.setSecretJSON('PLENTYMARKETS_CREDENTIALS', {
      baseUrl,
      accessToken: 'test-token-12345',
    })

    const singletonServices = await createSingletonServices({}, { secrets })
    const rpc = rpcService.getContextRPCService(singletonServices as any, {})

    try {
      const { passed, failed } = await rpc.invoke('testPlentymarkets', {})

      console.log(`\n  ${passed} passed`)
      if (failed.length > 0) {
        console.log(`  ${failed.length} failed:`)
        for (const f of failed) console.log(`    \u2717 ${f}`)
      }

      assert.equal(failed.length, 0, `Failed tests:\n${failed.join('\n')}`)
    } finally {
      await stopSingletonServices()
    }
  } finally {
    await stopServer(server)
  }
})
