import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MongoDBContainer } from '@testcontainers/mongodb'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalVariablesService, LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('mongodb addon', { timeout: 120_000 }, async (t) => {
  const container = await new MongoDBContainer('mongo:7')
    .withStartupTimeout(60_000)
    .start()

  const connectionString = container.getConnectionString() + '?directConnection=true'

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('MONGODB_CREDENTIALS', {
    connectionString,
    database: 'pikku_test',
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('mongoInsertOne inserts a document', async () => {
      const result = await rpc.invoke('mongodb:mongoInsertOne', {
        collection: 'users',
        document: { name: 'Alice', age: 30 },
      })
      assert.ok(result.insertedId)
      assert.equal(result.acknowledged, true)
    })

    await t.test('mongoInsertMany inserts multiple documents', async () => {
      const result = await rpc.invoke('mongodb:mongoInsertMany', {
        collection: 'users',
        documents: [
          { name: 'Bob', age: 25 },
          { name: 'Carol', age: 35 },
        ],
      })
      assert.equal(result.insertedCount, 2)
      assert.equal(result.insertedIds.length, 2)
    })

    await t.test('mongoFind returns documents', async () => {
      const result = await rpc.invoke('mongodb:mongoFind', {
        collection: 'users',
      })
      assert.equal(result.count, 3)
      const names = result.documents.map((d: any) => d.name).sort()
      assert.deepEqual(names, ['Alice', 'Bob', 'Carol'])
    })

    await t.test('mongoFind with filter', async () => {
      const result = await rpc.invoke('mongodb:mongoFind', {
        collection: 'users',
        query: { name: 'Alice' },
      })
      assert.equal(result.count, 1)
      assert.equal(result.documents[0].name, 'Alice')
    })

    await t.test('mongoFind with sort and limit', async () => {
      const result = await rpc.invoke('mongodb:mongoFind', {
        collection: 'users',
        sort: { age: 1 },
        limit: 2,
      })
      assert.equal(result.count, 2)
      assert.equal(result.documents[0].name, 'Bob')
      assert.equal(result.documents[1].name, 'Alice')
    })

    await t.test('mongoFind with projection', async () => {
      const result = await rpc.invoke('mongodb:mongoFind', {
        collection: 'users',
        query: { name: 'Alice' },
        projection: { name: 1, _id: 0 },
      })
      assert.equal(result.documents[0].name, 'Alice')
      assert.equal(result.documents[0]._id, undefined)
    })

    await t.test('mongoCount counts documents', async () => {
      const result = await rpc.invoke('mongodb:mongoCount', {
        collection: 'users',
      })
      assert.equal(result.count, 3)
    })

    await t.test('mongoCount with filter', async () => {
      const result = await rpc.invoke('mongodb:mongoCount', {
        collection: 'users',
        filter: { age: { $gte: 30 } },
      })
      assert.equal(result.count, 2)
    })

    await t.test('mongoUpdateOne updates a document', async () => {
      const result = await rpc.invoke('mongodb:mongoUpdateOne', {
        collection: 'users',
        filter: { name: 'Alice' },
        update: { $set: { age: 31 } },
      })
      assert.equal(result.matchedCount, 1)
      assert.equal(result.modifiedCount, 1)
    })

    await t.test('mongoUpdateMany updates multiple documents', async () => {
      const result = await rpc.invoke('mongodb:mongoUpdateMany', {
        collection: 'users',
        filter: { age: { $gte: 30 } },
        update: { $set: { senior: true } },
      })
      assert.equal(result.matchedCount, 2)
      assert.equal(result.modifiedCount, 2)
    })

    await t.test('mongoFindOneAndUpdate atomically updates', async () => {
      const result = await rpc.invoke('mongodb:mongoFindOneAndUpdate', {
        collection: 'users',
        filter: { name: 'Bob' },
        update: { $set: { age: 26 } },
        returnDocument: 'after',
      })
      assert.ok(result.document)
      assert.equal(result.document.name, 'Bob')
      assert.equal(result.document.age, 26)
    })

    await t.test('mongoAggregate runs pipeline', async () => {
      const result = await rpc.invoke('mongodb:mongoAggregate', {
        collection: 'users',
        pipeline: [
          { $group: { _id: null, avgAge: { $avg: '$age' } } },
        ],
      })
      assert.equal(result.count, 1)
      assert.ok(result.documents[0].avgAge > 0)
    })

    await t.test('mongoDeleteOne deletes a document', async () => {
      const result = await rpc.invoke('mongodb:mongoDeleteOne', {
        collection: 'users',
        filter: { name: 'Bob' },
      })
      assert.equal(result.deletedCount, 1)
    })

    await t.test('mongoDeleteMany deletes multiple documents', async () => {
      const result = await rpc.invoke('mongodb:mongoDeleteMany', {
        collection: 'users',
        filter: {},
      })
      assert.equal(result.deletedCount, 2)
    })

    await t.test('mongoListCollections lists collections', async () => {
      const result = await rpc.invoke('mongodb:mongoListCollections', {})
      assert.ok(result.collections.length > 0)
      assert.ok(result.collections.some((c: any) => c.name === 'users'))
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})
