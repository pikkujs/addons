import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const theHiveCredentialSchema = z.object({
  token: z.string().describe('TheHive bearer token'),
})

wireCredential({
  name: 'theHive',
  displayName: 'TheHive',
  description: 'Consume TheHive security incident response API',
  type: 'wire',
  schema: theHiveCredentialSchema,
})
