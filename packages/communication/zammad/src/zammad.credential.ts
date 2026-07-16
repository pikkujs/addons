import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const zammadCredentialSchema = z.object({
  token: z.string().describe('Zammad bearer token'),
})

wireCredential({
  name: 'zammad',
  displayName: 'Zammad',
  description: 'Consume the Zammad helpdesk API',
  type: 'wire',
  schema: zammadCredentialSchema,
})
