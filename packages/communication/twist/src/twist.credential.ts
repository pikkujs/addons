import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const twistTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const twistOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'twist',
  displayName: 'Twist',
  description: 'Consume the Twist team messaging API',
  type: 'wire',
  schema: twistTokenSchema,
  oauth2: {
    appCredentialSecretId: 'TWIST_OAUTH_APP',
    tokenSecretId: 'TWIST_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'twistOAuthApp',
  displayName: 'Twist OAuth App',
  description: 'OAuth2 app credentials for Twist',
  secretId: 'TWIST_OAUTH_APP',
  schema: twistOAuthAppSchema,
  optional: true,
})
