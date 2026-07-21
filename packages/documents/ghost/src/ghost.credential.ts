import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const ghostCredentialSchema = z.object({
  apiKey: z.string().describe('Ghost API key'),
})

wireCredential({
  name: 'ghost',
  displayName: 'Ghost',
  description: 'Consume the Ghost blogging CMS Admin and Content API',
  type: 'wire',
  schema: ghostCredentialSchema,
})
