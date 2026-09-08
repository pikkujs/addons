import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const linkedinTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
    authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    scopes: [
      'openid',
      'profile',
      'email',
      'w_member_social',
    ],
  },
})
