import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const keapTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
