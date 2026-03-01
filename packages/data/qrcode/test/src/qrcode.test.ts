import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'
import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname

test('qrcode addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('qrCodeGenerate creates a PNG QR code', async () => {
    const result = await rpc.invoke('qrcode:qrCodeGenerate', {
      text: 'https://pikku.dev',
      outputContentKey: 'qr-test.png',
    })
    assert.equal(result.outputContentKey, 'qr-test.png')
    assert.equal(result.format, 'png')
    assert.ok(result.size > 0)
    assert.ok(existsSync(join(fixturesDir, 'qr-test.png')))
  })

  await t.test('qrCodeGenerate creates an SVG QR code', async () => {
    const result = await rpc.invoke('qrcode:qrCodeGenerate', {
      text: 'Hello World',
      outputContentKey: 'qr-test.svg',
      format: 'svg',
    })
    assert.equal(result.format, 'svg')
    assert.ok(result.size > 0)
  })

  await t.test('qrCodeGenerate with custom options', async () => {
    const result = await rpc.invoke('qrcode:qrCodeGenerate', {
      text: 'Custom QR',
      outputContentKey: 'qr-custom.png',
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'H',
      darkColor: '#333333',
      lightColor: '#eeeeee',
    })
    assert.ok(result.size > 0)
  })

  await t.test('qrCodeRead decodes a QR code from image', async () => {
    // First generate a QR code, then read it back
    await rpc.invoke('qrcode:qrCodeGenerate', {
      text: 'decode-me-123',
      outputContentKey: 'qr-to-read.png',
      width: 300,
    })

    const result = await rpc.invoke('qrcode:qrCodeRead', {
      contentKey: 'qr-to-read.png',
    })
    assert.equal(result.found, true)
    assert.equal(result.data, 'decode-me-123')
  })

  await t.test('qrCodeRead with URL content', async () => {
    await rpc.invoke('qrcode:qrCodeGenerate', {
      text: 'https://github.com/pikkujs',
      outputContentKey: 'qr-url.png',
      width: 300,
      errorCorrectionLevel: 'H',
    })

    const result = await rpc.invoke('qrcode:qrCodeRead', {
      contentKey: 'qr-url.png',
    })
    assert.equal(result.found, true)
    assert.equal(result.data, 'https://github.com/pikkujs')
  })

  await t.test('qrCodeToDataUrl returns a data URL', async () => {
    const result = await rpc.invoke('qrcode:qrCodeToDataUrl', {
      text: 'data-url-test',
    })
    assert.ok(result.dataUrl.startsWith('data:image/png;base64,'))
    assert.ok(result.dataUrl.length > 100)
  })

  t.after(() => {
    const cleanup = [
      'qr-test.png', 'qr-test.svg', 'qr-custom.png',
      'qr-to-read.png', 'qr-url.png',
    ]
    for (const f of cleanup) {
      try { unlinkSync(join(fixturesDir, f)) } catch {}
    }
  })
})
