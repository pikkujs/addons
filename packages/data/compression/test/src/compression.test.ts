import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rpcService } from '@pikku/core/rpc'
import { createSingletonServices } from './services.js'
import { readFileSync, existsSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname

test('compression addon', async (t) => {
  const singletonServices = await createSingletonServices({}, {})
  const rpc = rpcService.getContextRPCService(singletonServices, {})

  await t.test('gzipCompress compresses a file', async () => {
    const result = await rpc.invoke('compression:gzipCompress', {
      contentKey: 'test.txt',
      outputContentKey: 'test.txt.gz',
    })
    assert.equal(result.outputContentKey, 'test.txt.gz')
    assert.ok(result.originalSize > 0)
    assert.ok(result.compressedSize > 0)
    assert.ok(existsSync(join(fixturesDir, 'test.txt.gz')))
  })

  await t.test('gzipDecompress decompresses back to original', async () => {
    const result = await rpc.invoke('compression:gzipDecompress', {
      contentKey: 'test.txt.gz',
      outputContentKey: 'test-decompressed.txt',
    })
    assert.equal(result.outputContentKey, 'test-decompressed.txt')
    const original = readFileSync(join(fixturesDir, 'test.txt'), 'utf-8')
    const decompressed = readFileSync(join(fixturesDir, 'test-decompressed.txt'), 'utf-8')
    assert.equal(decompressed, original)
  })

  await t.test('gzipCompress with level 9 produces smaller output', async () => {
    const result9 = await rpc.invoke('compression:gzipCompress', {
      contentKey: 'test.txt',
      outputContentKey: 'test-l9.txt.gz',
      level: 9,
    })
    const result1 = await rpc.invoke('compression:gzipCompress', {
      contentKey: 'test.txt',
      outputContentKey: 'test-l1.txt.gz',
      level: 1,
    })
    assert.ok(result9.compressedSize <= result1.compressedSize)
  })

  await t.test('deflateCompress compresses a file', async () => {
    const result = await rpc.invoke('compression:deflateCompress', {
      contentKey: 'test.txt',
      outputContentKey: 'test.deflate',
    })
    assert.equal(result.outputContentKey, 'test.deflate')
    assert.ok(result.originalSize > 0)
    assert.ok(result.compressedSize > 0)
  })

  await t.test('deflateDecompress decompresses back to original', async () => {
    const result = await rpc.invoke('compression:deflateDecompress', {
      contentKey: 'test.deflate',
      outputContentKey: 'test-deflate-decompressed.txt',
    })
    const original = readFileSync(join(fixturesDir, 'test.txt'), 'utf-8')
    const decompressed = readFileSync(join(fixturesDir, 'test-deflate-decompressed.txt'), 'utf-8')
    assert.equal(decompressed, original)
  })

  await t.test('zipCompress creates a zip with one file', async () => {
    const result = await rpc.invoke('compression:zipCompress', {
      files: [{ contentKey: 'test.txt', fileName: 'test.txt' }],
      outputContentKey: 'test.zip',
    })
    assert.equal(result.outputContentKey, 'test.zip')
    assert.equal(result.fileCount, 1)
    assert.ok(result.compressedSize > 0)
  })

  await t.test('zipDecompress extracts files from zip', async () => {
    const result = await rpc.invoke('compression:zipDecompress', {
      contentKey: 'test.zip',
      outputPrefix: 'extracted/',
    })
    assert.equal(result.files.length, 1)
    assert.equal(result.files[0].fileName, 'test.txt')
    const original = readFileSync(join(fixturesDir, 'test.txt'), 'utf-8')
    const extracted = readFileSync(join(fixturesDir, 'extracted', 'test.txt'), 'utf-8')
    assert.equal(extracted, original)
  })

  await t.test('zipCompress with multiple files', async () => {
    const result = await rpc.invoke('compression:zipCompress', {
      files: [
        { contentKey: 'test.txt', fileName: 'a.txt' },
        { contentKey: 'test.txt', fileName: 'b.txt' },
      ],
      outputContentKey: 'multi.zip',
    })
    assert.equal(result.fileCount, 2)

    const decomp = await rpc.invoke('compression:zipDecompress', {
      contentKey: 'multi.zip',
      outputPrefix: 'multi-extracted/',
    })
    assert.equal(decomp.files.length, 2)
    const names = decomp.files.map((f: any) => f.fileName).sort()
    assert.deepEqual(names, ['a.txt', 'b.txt'])
  })

  // Clean up generated files
  t.after(() => {
    const cleanup = [
      'test.txt.gz', 'test-decompressed.txt', 'test-l9.txt.gz', 'test-l1.txt.gz',
      'test.deflate', 'test-deflate-decompressed.txt', 'test.zip', 'multi.zip',
      'extracted/test.txt', 'multi-extracted/a.txt', 'multi-extracted/b.txt',
    ]
    for (const f of cleanup) {
      try { unlinkSync(join(fixturesDir, f)) } catch {}
    }
    try { require('node:fs').rmdirSync(join(fixturesDir, 'extracted')) } catch {}
    try { require('node:fs').rmdirSync(join(fixturesDir, 'multi-extracted')) } catch {}
  })
})
