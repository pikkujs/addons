import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const amqpCredentialSchema = z.object({
  apiKey: z.string().describe('AMQP API key'),
})

defineCredential({
  name: 'amqp',
  displayName: 'AMQP',
  description: 'AMQP sender integration for Pikku',
  type: 'wire',
  schema: amqpCredentialSchema,
})
