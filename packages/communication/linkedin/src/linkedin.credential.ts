import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const linkedinTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const linkedinOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'linkedin',
  displayName: 'LinkedIn',
  description: 'Consume LinkedIn API',
  type: 'wire',
  schema: linkedinTokenSchema,
  oauth2: {
    appCredentialSecretId: 'LINKEDIN_OAUTH_APP',
    tokenSecretId: 'LINKEDIN_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'linkedinOAuthApp',
  displayName: 'LinkedIn OAuth App',
  description: 'OAuth2 app credentials for LinkedIn',
  secretId: 'LINKEDIN_OAUTH_APP',
  schema: linkedinOAuthAppSchema,
  optional: true,
})
