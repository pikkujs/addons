import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GenericContainer, Wait } from 'testcontainers'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const fixturesDir = new URL('../fixtures', import.meta.url).pathname
try { mkdirSync(fixturesDir, { recursive: true }) } catch {}
writeFileSync(join(fixturesDir, 's3-upload.txt'), 'Hello from S3 test!')

test('s3 addon', { timeout: 120_000 }, async (t) => {
  const container = await new GenericContainer('minio/minio')
    .withExposedPorts(9000)
    .withCommand(['server', '/data'])
    .withEnvironment({
      MINIO_ROOT_USER: 'minioadmin',
      MINIO_ROOT_PASSWORD: 'minioadmin',
    })
    .withWaitStrategy(Wait.forHttp('/minio/health/ready', 9000))
    .withStartupTimeout(60_000)
    .start()

  const host = container.getHost()
  const port = container.getMappedPort(9000)

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('S3_CREDENTIALS', {
    accessKeyId: 'minioadmin',
    secretAccessKey: 'minioadmin',
    region: 'us-east-1',
    endpoint: `http://${host}:${port}`,
    forcePathStyle: true,
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('s3CreateBucket creates a bucket', async () => {
      const result = await rpc.invoke('s3:s3CreateBucket', {
        bucket: 'test-bucket',
      })
      assert.equal(result.success, true)
    })

    await t.test('s3ListBuckets lists buckets', async () => {
      const result = await rpc.invoke('s3:s3ListBuckets', {})
      assert.ok(result.count >= 1)
      assert.ok(result.buckets.some((b: any) => b.name === 'test-bucket'))
    })

    await t.test('s3PutObject uploads a file', async () => {
      const result = await rpc.invoke('s3:s3PutObject', {
        bucket: 'test-bucket',
        key: 'test-file.txt',
        contentKey: 's3-upload.txt',
        contentType: 'text/plain',
      })
      assert.ok(result.etag)
    })

    await t.test('s3ListObjects lists objects', async () => {
      const result = await rpc.invoke('s3:s3ListObjects', {
        bucket: 'test-bucket',
      })
      assert.ok(result.count >= 1)
      assert.ok(result.objects.some((o: any) => o.key === 'test-file.txt'))
    })

    await t.test('s3ListObjects with prefix', async () => {
      await rpc.invoke('s3:s3PutObject', {
        bucket: 'test-bucket',
        key: 'folder/nested.txt',
        contentKey: 's3-upload.txt',
      })
      const result = await rpc.invoke('s3:s3ListObjects', {
        bucket: 'test-bucket',
        prefix: 'folder/',
      })
      assert.ok(result.count >= 1)
      assert.ok(result.objects.some((o: any) => o.key === 'folder/nested.txt'))
    })

    await t.test('s3GetObject downloads a file', async () => {
      const result = await rpc.invoke('s3:s3GetObject', {
        bucket: 'test-bucket',
        key: 'test-file.txt',
        outputContentKey: 's3-downloaded.txt',
      })
      assert.equal(result.outputContentKey, 's3-downloaded.txt')
      assert.equal(result.contentType, 'text/plain')
      assert.ok(result.contentLength! > 0)
    })

    await t.test('s3CopyObject copies a file', async () => {
      const result = await rpc.invoke('s3:s3CopyObject', {
        sourceBucket: 'test-bucket',
        sourceKey: 'test-file.txt',
        destinationBucket: 'test-bucket',
        destinationKey: 'copied-file.txt',
      })
      assert.ok(result.etag)
    })

    await t.test('s3DeleteObject deletes a file', async () => {
      const result = await rpc.invoke('s3:s3DeleteObject', {
        bucket: 'test-bucket',
        key: 'copied-file.txt',
      })
      assert.equal(result.success, true)
    })

    await t.test('s3DeleteObject and cleanup', async () => {
      await rpc.invoke('s3:s3DeleteObject', { bucket: 'test-bucket', key: 'test-file.txt' })
      await rpc.invoke('s3:s3DeleteObject', { bucket: 'test-bucket', key: 'folder/nested.txt' })

      const result = await rpc.invoke('s3:s3ListObjects', {
        bucket: 'test-bucket',
      })
      assert.equal(result.count, 0)
    })

    await t.test('s3DeleteBucket deletes a bucket', async () => {
      const result = await rpc.invoke('s3:s3DeleteBucket', {
        bucket: 'test-bucket',
      })
      assert.equal(result.success, true)
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})
