import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

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

export const githubOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineSecret({
  name: 'githubOAuthApp',
  schema: githubOAuthAppSchema,
  displayName: 'GitHub OAuth App',
  description: 'OAuth2 app credentials for GitHub',
  secretId: 'GITHUB_OAUTH_APP',
})
