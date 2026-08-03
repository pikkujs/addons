import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const quickbooksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const quickbooksOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'quickbooksOAuthApp',
  displayName: 'QuickBooks Online OAuth App',
  description: 'OAuth2 app credentials for QuickBooks Online',
  secretId: 'QUICKBOOKS_OAUTH_APP',
  schema: quickbooksOAuthAppSchema,
})
