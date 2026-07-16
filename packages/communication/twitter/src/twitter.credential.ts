import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const twitterTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const twitterOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'twitter',
  displayName: 'X (Twitter)',
  description: 'Post, like, search tweets, send DMs, manage lists and users via the X API',
  type: 'wire',
  schema: twitterTokenSchema,
  oauth2: {
    appCredentialSecretId: 'TWITTER_OAUTH_APP',
    tokenSecretId: 'TWITTER_OAUTH_TOKENS',
    // NOTE: X mandates PKCE for every client, including confidential ones.
    // OAuth2Client accepts `pkce` but never emits code_challenge, so this
    // addon cannot complete a connect until pikkujs/pikku#953 lands.
    authorizationUrl: 'https://x.com/i/oauth2/authorize',
    tokenUrl: 'https://api.x.com/2/oauth2/token',
    scopes: [
      'tweet.read',
      'tweet.write',
      'users.read',
      'like.write',
      'list.write',
      'dm.write',
      'offline.access',
    ],
    pkce: true,
  },
})

wireSecret({
  name: 'twitterOAuthApp',
  displayName: 'X (Twitter) OAuth App',
  description: 'OAuth2 app credentials for X (Twitter)',
  secretId: 'TWITTER_OAUTH_APP',
  schema: twitterOAuthAppSchema,
})
