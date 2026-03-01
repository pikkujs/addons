import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RedpandaContainer } from '@testcontainers/redpanda'
import { stopSingletonServices } from '@pikku/core'
import { rpcService } from '@pikku/core/rpc'
import { LocalSecretService } from '@pikku/core/services'
import { createSingletonServices } from './services.js'

test('kafka addon', { timeout: 180_000 }, async (t) => {
  const container = await new RedpandaContainer('redpandadata/redpanda:v24.1.1')
    .start()

  const brokers = container.getBootstrapServers()

  const secrets = new LocalSecretService()
  await secrets.setSecretJSON('KAFKA_CREDENTIALS', {
    brokers: [brokers],
    clientId: 'pikku-test',
  })

  const singletonServices = await createSingletonServices({}, { secrets })
  const rpc = rpcService.getContextRPCService(singletonServices as any, {})

  try {
    await t.test('kafkaCreateTopic creates a topic', async () => {
      const result = await rpc.invoke('kafka:kafkaCreateTopic', {
        topic: 'test-topic',
        numPartitions: 1,
        replicationFactor: 1,
      })
      assert.equal(result.success, true)
    })

    await t.test('kafkaListTopics lists topics', async () => {
      const result = await rpc.invoke('kafka:kafkaListTopics', {})
      assert.ok(result.topics.includes('test-topic'))
      assert.ok(result.count >= 1)
    })

    await t.test('kafkaProduce sends a message', async () => {
      const result = await rpc.invoke('kafka:kafkaProduce', {
        topic: 'test-topic',
        messages: [
          { key: 'key1', value: 'Hello Kafka!' },
        ],
      })
      assert.ok(result.topicPartitions.length > 0)
      assert.equal(result.topicPartitions[0].errorCode, 0)
    })

    await t.test('kafkaProduce sends multiple messages', async () => {
      const result = await rpc.invoke('kafka:kafkaProduce', {
        topic: 'test-topic',
        messages: [
          { key: 'key2', value: 'Message 2' },
          { key: 'key3', value: 'Message 3' },
          { value: 'Message without key' },
        ],
      })
      assert.ok(result.topicPartitions.length > 0)
    })

    await t.test('kafkaProduce with headers', async () => {
      const result = await rpc.invoke('kafka:kafkaProduce', {
        topic: 'test-topic',
        messages: [
          {
            key: 'key4',
            value: 'With headers',
            headers: { 'x-source': 'pikku-test', 'x-type': 'event' },
          },
        ],
      })
      assert.equal(result.topicPartitions[0].errorCode, 0)
    })

    await t.test('kafkaCreateTopic for second topic', async () => {
      const result = await rpc.invoke('kafka:kafkaCreateTopic', {
        topic: 'another-topic',
      })
      assert.equal(result.success, true)
    })

    await t.test('kafkaDeleteTopic deletes topics', async () => {
      const result = await rpc.invoke('kafka:kafkaDeleteTopic', {
        topics: ['another-topic'],
      })
      assert.equal(result.success, true)
    })
  } finally {
    await stopSingletonServices()
    await container.stop()
  }
})
