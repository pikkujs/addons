import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const facebookGraphApiCredentialSchema = z.object({
  apiKey: z.string().describe('Facebook Graph API API key'),
})

wireCredential({
  name: 'facebookGraphApi',
  displayName: 'Facebook Graph API',
  description: 'Interact with Facebook using the Graph API',
  type: 'wire',
  schema: facebookGraphApiCredentialSchema,
})
