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
    // NOTE: Twist expects a COMMA-separated scope list. OAuth2Client joins
    // scopes with a space (RFC 6749), so Twist rejects this today — see
    // pikkujs/pikku#954. The scopes below are correct; the separator is not.
    authorizationUrl: 'https://twist.com/oauth/authorize',
    tokenUrl: 'https://twist.com/oauth/access_token',
    scopes: [
      'channels:read',
      'channels:write',
      'channels:remove',
      'threads:read',
      'threads:write',
      'threads:remove',
      'comments:read',
      'comments:write',
      'comments:remove',
      'messages:read',
      'messages:write',
      'messages:remove',
    ],
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
