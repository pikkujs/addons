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
