import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const keapTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const keapOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'keap',
  displayName: 'Keap',
  description: 'Consume the Keap (Infusionsoft) CRM API',
  type: 'wire',
  schema: keapTokenSchema,
  oauth2: {
    appCredentialSecretId: 'KEAP_OAUTH_APP',
    tokenSecretId: 'KEAP_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'keapOAuthApp',
  displayName: 'Keap OAuth App',
  description: 'OAuth2 app credentials for Keap',
  secretId: 'KEAP_OAUTH_APP',
  schema: keapOAuthAppSchema,
})
