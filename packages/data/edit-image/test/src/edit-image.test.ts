import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'
import { existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname

test('edit-image addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('imageMetadata returns image info', async () => {
    const result = await rpc.invoke('edit-image:imageMetadata', {
      contentKey: 'test.png',
    })
    assert.equal(result.width, 200)
    assert.equal(result.height, 150)
    assert.equal(result.format, 'png')
    assert.equal(result.channels, 3)
  })

  await t.test('imageResize resizes an image', async () => {
    const result = await rpc.invoke('edit-image:imageResize', {
      contentKey: 'test.png',
      outputContentKey: 'resized.png',
      width: 100,
      height: 75,
    })
    assert.equal(result.outputContentKey, 'resized.png')
    assert.equal(result.width, 100)
    assert.equal(result.height, 75)
    assert.ok(result.size > 0)
  })

  await t.test('imageResize with fit contain', async () => {
    const result = await rpc.invoke('edit-image:imageResize', {
      contentKey: 'test.png',
      outputContentKey: 'resized-contain.png',
      width: 100,
      height: 100,
      fit: 'contain',
    })
    assert.ok(result.width <= 100)
    assert.ok(result.height <= 100)
  })

  await t.test('imageCrop crops a region', async () => {
    const result = await rpc.invoke('edit-image:imageCrop', {
      contentKey: 'test.png',
      outputContentKey: 'cropped.png',
      left: 10,
      top: 10,
      width: 50,
      height: 50,
    })
    assert.equal(result.width, 50)
    assert.equal(result.height, 50)
  })

  await t.test('imageRotate rotates an image', async () => {
    const result = await rpc.invoke('edit-image:imageRotate', {
      contentKey: 'test.png',
      outputContentKey: 'rotated.png',
      angle: 90,
    })
    assert.equal(result.width, 150)
    assert.equal(result.height, 200)
  })

  await t.test('imageBlur applies blur', async () => {
    const result = await rpc.invoke('edit-image:imageBlur', {
      contentKey: 'test.png',
      outputContentKey: 'blurred.png',
      sigma: 5,
    })
    assert.ok(result.size > 0)
  })

  await t.test('imageFlip flips horizontally', async () => {
    const result = await rpc.invoke('edit-image:imageFlip', {
      contentKey: 'test.png',
      outputContentKey: 'flipped-h.png',
      direction: 'horizontal',
    })
    assert.ok(result.size > 0)
  })

  await t.test('imageFlip flips vertically', async () => {
    const result = await rpc.invoke('edit-image:imageFlip', {
      contentKey: 'test.png',
      outputContentKey: 'flipped-v.png',
      direction: 'vertical',
    })
    assert.ok(result.size > 0)
  })

  await t.test('imageConvert converts to jpeg', async () => {
    const result = await rpc.invoke('edit-image:imageConvert', {
      contentKey: 'test.png',
      outputContentKey: 'converted.jpg',
      format: 'jpeg',
      quality: 80,
    })
    assert.equal(result.format, 'jpeg')
    assert.ok(result.size > 0)
  })

  await t.test('imageConvert converts to webp', async () => {
    const result = await rpc.invoke('edit-image:imageConvert', {
      contentKey: 'test.png',
      outputContentKey: 'converted.webp',
      format: 'webp',
    })
    assert.equal(result.format, 'webp')
  })

  await t.test('imageComposite overlays images', async () => {
    const result = await rpc.invoke('edit-image:imageComposite', {
      contentKey: 'test.png',
      overlayContentKey: 'overlay.png',
      outputContentKey: 'composited.png',
      left: 10,
      top: 10,
    })
    assert.equal(result.width, 200)
    assert.equal(result.height, 150)
    assert.ok(result.size > 0)
  })

  await t.test('imageComposite with gravity', async () => {
    const result = await rpc.invoke('edit-image:imageComposite', {
      contentKey: 'test.png',
      overlayContentKey: 'overlay.png',
      outputContentKey: 'composited-center.png',
      gravity: 'centre',
    })
    assert.ok(result.size > 0)
  })

  // Clean up generated files
  t.after(() => {
    const cleanup = [
      'resized.png', 'resized-contain.png', 'cropped.png', 'rotated.png',
      'blurred.png', 'flipped-h.png', 'flipped-v.png',
      'converted.jpg', 'converted.webp',
      'composited.png', 'composited-center.png',
    ]
    for (const f of cleanup) {
      try { unlinkSync(join(fixturesDir, f)) } catch {}
    }
  })
})
