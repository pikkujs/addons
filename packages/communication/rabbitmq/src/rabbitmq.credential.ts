import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const rabbitmqCredentialSchema = z.object({
  apiKey: z.string().describe('rabbitmq API key'),
})

wireCredential({
  name: 'rabbitmq',
  displayName: 'rabbitmq',
  description: 'rabbitmq addon',
  type: 'wire',
  schema: rabbitmqCredentialSchema,
})
