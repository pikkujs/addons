import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

const jsonResponse = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => body,
  }) as Response

const stubFetch = (
  handler: (url: string) => unknown
): (() => void) => {
  const original = globalThis.fetch
  globalThis.fetch = (async (input: RequestInfo | URL) =>
    jsonResponse(handler(String(input)))) as typeof fetch
  return () => {
    globalThis.fetch = original
  }
}

test('wikipedia addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('search parses results and strips snippet HTML', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /list=search/)
      assert.match(url, /srsearch=Ada%20Lovelace/)
      return {
        query: {
          search: [
            {
              title: 'Ada Lovelace',
              snippet: 'An <span class="s">English</span> mathematician',
              pageid: 1234,
            },
          ],
        },
      }
    })
    try {
      const result = await rpc.invoke('wikipedia:search', {
        query: 'Ada Lovelace',
      })
      assert.equal(result.results.length, 1)
      assert.equal(result.results[0].title, 'Ada Lovelace')
      assert.equal(result.results[0].snippet, 'An English mathematician')
      assert.equal(result.results[0].pageId, 1234)
      assert.match(result.results[0].url, /Ada_Lovelace/)
    } finally {
      restore()
    }
  })

  await test('summary parses extract, url and thumbnail', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /page\/summary\/Ada%20Lovelace/)
      return {
        title: 'Ada Lovelace',
        description: 'English mathematician (1815–1852)',
        extract: 'Ada Lovelace was an English mathematician.',
        content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Ada_Lovelace' } },
        thumbnail: { source: 'https://example.org/ada.jpg' },
      }
    })
    try {
      const result = await rpc.invoke('wikipedia:summary', {
        title: 'Ada Lovelace',
      })
      assert.equal(result.extract, 'Ada Lovelace was an English mathematician.')
      assert.equal(result.url, 'https://en.wikipedia.org/wiki/Ada_Lovelace')
      assert.equal(result.thumbnail, 'https://example.org/ada.jpg')
    } finally {
      restore()
    }
  })

  await test('getPage reads the first page extract from the action API', async () => {
    const restore = stubFetch((url) => {
      assert.match(url, /prop=extracts/)
      assert.match(url, /explaintext=1/)
      return {
        query: {
          pages: {
            '1234': {
              title: 'Ada Lovelace',
              extract: 'Full article body about Ada Lovelace.',
            },
          },
        },
      }
    })
    try {
      const result = await rpc.invoke('wikipedia:getPage', {
        title: 'Ada Lovelace',
      })
      assert.equal(result.title, 'Ada Lovelace')
      assert.equal(result.extract, 'Full article body about Ada Lovelace.')
    } finally {
      restore()
    }
  })

  await test('a non-ok response throws a descriptive error', async () => {
    const original = globalThis.fetch
    globalThis.fetch = (async () =>
      ({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({}),
      }) as Response) as typeof fetch
    try {
      await assert.rejects(
        () => rpc.invoke('wikipedia:summary', { title: 'Nope' }),
        /404/
      )
    } finally {
      globalThis.fetch = original
    }
  })
})
