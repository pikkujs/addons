import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const amqpCredentialSchema = z.object({
  apiKey: z.string().describe('AMQP API key'),
})

wireCredential({
  name: 'amqp',
  displayName: 'AMQP',
  description: 'AMQP sender integration for Pikku',
  type: 'wire',
  schema: amqpCredentialSchema,
})
