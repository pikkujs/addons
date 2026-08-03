import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const rabbitmqCredentialSchema = z.object({
  apiKey: z.string().describe('rabbitmq API key'),
})

defineCredential({
  name: 'rabbitmq',
  displayName: 'rabbitmq',
  description: 'rabbitmq addon',
  type: 'wire',
  schema: rabbitmqCredentialSchema,
})
