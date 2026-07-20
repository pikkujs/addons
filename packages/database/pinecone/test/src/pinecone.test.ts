import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })

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

test('pinecone addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  await test('search maps Pinecone matches (metadata → payload)', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /index\.pinecone\.test\/query/)
      return {
        matches: [
          { id: 'v1', score: 0.9, metadata: { text: 'hi' } },
          { id: 'v2', score: 0.5, metadata: null },
        ],
      }
    })
    try {
      const result = await rpc.invoke('pinecone:search', {
        collection: 'ns',
        vector: [0.1, 0.2],
        topK: 2,
      })
      assert.equal(result.matches.length, 2)
      assert.equal(result.matches[0].id, 'v1')
      assert.deepEqual(result.matches[0].payload, { text: 'hi' })
      assert.deepEqual(result.matches[1].payload, {})
    } finally {
      restore()
    }
  })

  await test('query embeds via the aiEmbedding service then searches', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /index\.pinecone\.test\/query/)
      return { matches: [{ id: 'doc1', score: 0.8, metadata: { title: 'Policy' } }] }
    })
    try {
      const result = await rpc.invoke('pinecone:query', {
        collection: '',
        query: 'refund policy',
      })
      assert.equal(result.query, 'refund policy')
      assert.equal(result.matches.length, 1)
      assert.equal(result.matches[0].id, 'doc1')
    } finally {
      restore()
    }
  })

  await test('upsert writes vectors and reports the count', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /\/vectors\/upsert$/)
      return { upsertedCount: 2 }
    })
    try {
      const result = await rpc.invoke('pinecone:upsert', {
        collection: 'ns',
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
      assert.match(url, /\/vectors\/upsert$/)
      body = JSON.parse(String(init?.body))
      return { upsertedCount: 2 }
    })
    try {
      const result = await rpc.invoke('pinecone:ingest', {
        collection: 'docs',
        texts: ['first chunk', 'second chunk'],
      })
      assert.equal(result.upserted, 2)
      assert.equal(body.namespace, 'docs')
      assert.equal(body.vectors.length, 2)
      assert.deepEqual(body.vectors[0].values, [0.1, 0.2, 0.3])
      assert.deepEqual(body.vectors[0].metadata, { text: 'first chunk' })
    } finally {
      restore()
    }
  })

  await test('a non-ok pinecone response throws', async () => {
    const original = globalThis.fetch
    globalThis.fetch = (async () =>
      ({ ok: false, status: 403, statusText: 'Forbidden', json: async () => ({}) }) as Response) as typeof fetch
    try {
      await assert.rejects(
        () => rpc.invoke('pinecone:search', { collection: '', vector: [0], topK: 1 }),
        /403/
      )
    } finally {
      globalThis.fetch = original
    }
  })
})
