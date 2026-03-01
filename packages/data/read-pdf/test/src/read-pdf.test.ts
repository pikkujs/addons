import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'

test('read-pdf addon', async () => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await test('readPdf extracts text from PDF', async () => {
    const result = await rpc.invoke('read-pdf:readPdf', {
      assetKey: 'sample.pdf',
    })
    assert.ok(result.text.includes('Hello World from Pikku PDF Test'))
    assert.ok(result.text.includes('Second page content here'))
  })

  await test('readPdf returns page count', async () => {
    const result = await rpc.invoke('read-pdf:readPdf', {
      assetKey: 'sample.pdf',
    })
    assert.equal(result.numPages, 2)
  })

  await test('readPdf returns metadata', async () => {
    const result = await rpc.invoke('read-pdf:readPdf', {
      assetKey: 'sample.pdf',
    })
    assert.equal(result.info.Title, 'Pikku Test PDF')
    assert.equal(result.info.Author, 'Pikku')
  })

  await test('readPdf with maxPages limits extraction', async () => {
    const result = await rpc.invoke('read-pdf:readPdf', {
      assetKey: 'sample.pdf',
      maxPages: 1,
    })
    assert.ok(result.text.includes('Hello World from Pikku PDF Test'))
    assert.ok(!result.text.includes('Second page content here'))
  })
})
