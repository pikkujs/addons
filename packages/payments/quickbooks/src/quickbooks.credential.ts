import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const quickbooksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'quickbooks',
  displayName: 'QuickBooks Online',
  description: 'Consume the QuickBooks Online accounting API',
  type: 'wire',
  schema: quickbooksTokenSchema,
  oauth2: {
    appCredentialSecretId: 'QUICKBOOKS_OAUTH_APP',
    tokenSecretId: 'QUICKBOOKS_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
