import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })

/** Route stubbed fetch by URL: OpenAI embeddings vs Qdrant REST. */
const stubFetch = (
  handler: (url: string, init?: RequestInit) => unknown
): (() => void) => {
  const original = globalThis.fetch
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) =>
    jsonResponse(handler(String(input), init))) as typeof fetch
  return () => {
    globalThis.fetch = original
  }
}

test('qdrant addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  await test('search returns mapped matches for a vector', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /qdrant\.test/)
      assert.match(url, /\/collections\/docs\/points\/search/)
      return {
        result: [
          { id: 'a1', score: 0.92, payload: { text: 'hello' } },
          { id: 7, score: 0.81, payload: null },
        ],
      }
    })
    try {
      const result = await rpc.invoke('qdrant:search', {
        collection: 'docs',
        vector: [0.1, 0.2, 0.3],
        topK: 2,
      })
      assert.equal(result.matches.length, 2)
      assert.equal(result.matches[0].id, 'a1')
      assert.equal(result.matches[0].score, 0.92)
      assert.deepEqual(result.matches[0].payload, { text: 'hello' })
      assert.deepEqual(result.matches[1].payload, {})
    } finally {
      restore()
    }
  })

  await test('query embeds via the aiEmbedding service then searches', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /qdrant\.test/)
      assert.match(url, /\/collections\/handbook\/points\/search/)
      return { result: [{ id: 'doc1', score: 0.77, payload: { title: 'Vacation' } }] }
    })
    try {
      const result = await rpc.invoke('qdrant:query', {
        collection: 'handbook',
        query: 'how many vacation days',
      })
      assert.equal(result.query, 'how many vacation days')
      assert.equal(result.matches.length, 1)
      assert.equal(result.matches[0].id, 'doc1')
    } finally {
      restore()
    }
  })

  await test('upsert writes points and reports the count', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /\/collections\/docs\/points$/)
      return { result: { operation_id: 1, status: 'completed' } }
    })
    try {
      const result = await rpc.invoke('qdrant:upsert', {
        collection: 'docs',
        points: [
          { id: 1, vector: [0.1], payload: { a: 1 } },
          { id: 2, vector: [0.2] },
        ],
      })
      assert.equal(result.upserted, 2)
    } finally {
      restore()
    }
  })

  await test('ingest embeds chunks via aiEmbedding and upserts them', async () => {
    let body: any
    const restore = stubFetch((url, init) => {
      assert.match(url, /\/collections\/docs\/points$/)
      body = JSON.parse(String(init?.body))
      return { result: { operation_id: 1, status: 'completed' } }
    })
    try {
      const result = await rpc.invoke('qdrant:ingest', {
        collection: 'docs',
        texts: ['first chunk', 'second chunk'],
      })
      assert.equal(result.upserted, 2)
      assert.equal(body.points.length, 2)
      assert.deepEqual(body.points[0].vector, [0.1, 0.2, 0.3])
      assert.deepEqual(body.points[0].payload, { text: 'first chunk' })
    } finally {
      restore()
    }
  })

  await test('a non-ok qdrant response throws', async () => {
    const original = globalThis.fetch
    globalThis.fetch = (async () =>
      ({ ok: false, status: 500, statusText: 'Server Error', json: async () => ({}) }) as Response) as typeof fetch
    try {
      await assert.rejects(
        () => rpc.invoke('qdrant:search', { collection: 'x', vector: [0], topK: 1 }),
        /500/
      )
    } finally {
      globalThis.fetch = original
    }
  })
})
