import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const githubTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'github',
  displayName: 'GitHub',
  description: 'GitHub integration for Pikku',
  type: 'wire',
  schema: githubTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GITHUB_OAUTH_APP',
    tokenSecretId: 'GITHUB_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
