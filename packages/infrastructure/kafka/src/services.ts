import { Kafka, type Producer } from 'kafkajs'
import type { KafkaSecrets } from './kafka.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => {
  const creds = await secrets.getSecretJSON<KafkaSecrets>('KAFKA_CREDENTIALS')

  const kafka = new Kafka({
    clientId: creds.clientId ?? 'pikku',
    brokers: creds.brokers,
    ssl: creds.ssl ?? false,
    sasl: creds.saslUsername ? {
      mechanism: creds.saslMechanism ?? 'plain',
      username: creds.saslUsername,
      password: creds.saslPassword ?? '',
    } : undefined,
  })

  const kafkaProducer: Producer = kafka.producer()
  await kafkaProducer.connect()

  const kafkaAdmin = kafka.admin()
  await kafkaAdmin.connect()

  return {
    kafka,
    kafkaProducer,
    kafkaAdmin,
    stop: async () => {
      await kafkaProducer.disconnect()
      await kafkaAdmin.disconnect()
    },
  }
})
