import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const redditTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const redditOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'reddit',
  displayName: 'Reddit',
  description: 'Consume the Reddit API',
  type: 'wire',
  schema: redditTokenSchema,
  oauth2: {
    appCredentialSecretId: 'REDDIT_OAUTH_APP',
    tokenSecretId: 'REDDIT_OAUTH_TOKENS',
    authorizationUrl: 'https://www.reddit.com/api/v1/authorize',
    tokenUrl: 'https://www.reddit.com/api/v1/access_token',
    scopes: [
      'identity',
      'read',
      'submit',
      'edit',
      'mysubreddits',
      'history',
    ],
    additionalParams: {
      duration: 'permanent',
    },
  },
})

defineSecret({
  name: 'redditOAuthApp',
  displayName: 'Reddit OAuth App',
  description: 'OAuth2 app credentials for Reddit',
  secretId: 'REDDIT_OAUTH_APP',
  schema: redditOAuthAppSchema,
  optional: true,
})
