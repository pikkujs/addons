import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleDocsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleDocs',
  displayName: 'Google Docs',
  description: 'Google Docs integration for Pikku',
  type: 'wire',
  schema: googleDocsTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_DOCS_OAUTH_APP',
    tokenSecretId: 'GOOGLE_DOCS_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
