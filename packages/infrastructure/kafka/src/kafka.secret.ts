import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const kafkaSecretsSchema = z.object({
  brokers: z.array(z.string()).describe('Kafka broker addresses (e.g. ["localhost:9092"])'),
  clientId: z.string().optional().describe('Client ID for the Kafka connection'),
  saslUsername: z.string().optional().describe('SASL username for authentication'),
  saslPassword: z.string().optional().describe('SASL password for authentication'),
  saslMechanism: z.enum(['plain', 'scram-sha-256', 'scram-sha-512']).optional().describe('SASL mechanism'),
  ssl: z.boolean().optional().describe('Use SSL/TLS for the connection'),
})

export type KafkaSecrets = z.infer<typeof kafkaSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'Kafka Credentials',
  description: 'Kafka broker connection credentials',
  secretId: 'KAFKA_CREDENTIALS',
  schema: kafkaSecretsSchema,
})
