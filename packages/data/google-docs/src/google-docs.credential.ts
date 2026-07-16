import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const googleDocsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

wireCredential({
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

export const googleDocsOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireSecret({
  name: 'googleDocsOAuthApp',
  schema: googleDocsOAuthAppSchema,
  displayName: 'Google Docs OAuth App',
  description: 'OAuth2 app credentials for Google Docs',
  secretId: 'GOOGLE_DOCS_OAUTH_APP',
})
