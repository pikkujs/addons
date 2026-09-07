import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const twistTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
