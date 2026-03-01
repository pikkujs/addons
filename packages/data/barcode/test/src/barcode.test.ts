import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'
import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname

test('barcode addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('barcodeGenerate creates a Code128 barcode', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: 'PIKKU-12345',
      outputContentKey: 'barcode-128.png',
    })
    assert.equal(result.outputContentKey, 'barcode-128.png')
    assert.ok(result.size > 0)
    assert.ok(existsSync(join(fixturesDir, 'barcode-128.png')))
  })

  await t.test('barcodeGenerate creates a Code39 barcode', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: 'HELLO',
      outputContentKey: 'barcode-39.png',
      type: 'code39',
    })
    assert.ok(result.size > 0)
  })

  await t.test('barcodeGenerate creates an EAN-13 barcode', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: '5901234123457',
      outputContentKey: 'barcode-ean13.png',
      type: 'ean13',
    })
    assert.ok(result.size > 0)
  })

  await t.test('barcodeGenerate creates a DataMatrix barcode', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: 'DataMatrix Test',
      outputContentKey: 'barcode-dm.png',
      type: 'datamatrix',
    })
    assert.ok(result.size > 0)
  })

  await t.test('barcodeGenerate with custom options', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: 'SCALED',
      outputContentKey: 'barcode-custom.png',
      type: 'code128',
      scale: 5,
      height: 15,
      includeText: false,
    })
    assert.ok(result.size > 0)
  })

  await t.test('barcodeGenerate creates a PDF417 barcode', async () => {
    const result = await rpc.invoke('barcode:barcodeGenerate', {
      text: 'PDF417 content here',
      outputContentKey: 'barcode-pdf417.png',
      type: 'pdf417',
    })
    assert.ok(result.size > 0)
  })

  await t.test('barcodeToDataUrl returns a data URL', async () => {
    const result = await rpc.invoke('barcode:barcodeToDataUrl', {
      text: 'DATA-URL',
    })
    assert.ok(result.dataUrl.startsWith('data:image/png;base64,'))
    assert.ok(result.dataUrl.length > 100)
  })

  await t.test('barcodeToDataUrl with EAN-8', async () => {
    const result = await rpc.invoke('barcode:barcodeToDataUrl', {
      text: '12345670',
      type: 'ean8',
    })
    assert.ok(result.dataUrl.startsWith('data:image/png;base64,'))
  })

  t.after(() => {
    const cleanup = [
      'barcode-128.png', 'barcode-39.png', 'barcode-ean13.png',
      'barcode-dm.png', 'barcode-custom.png', 'barcode-pdf417.png',
    ]
    for (const f of cleanup) {
      try { unlinkSync(join(fixturesDir, f)) } catch {}
    }
  })
})
