import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const raindropTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'raindrop',
  displayName: 'Raindrop',
  description: 'Consume the Raindrop bookmarks API',
  type: 'wire',
  schema: raindropTokenSchema,
  oauth2: {
    appCredentialSecretId: 'RAINDROP_OAUTH_APP',
    tokenSecretId: 'RAINDROP_OAUTH_TOKENS',
    authorizationUrl: 'https://raindrop.io/oauth/authorize',
    tokenUrl: 'https://raindrop.io/oauth/access_token',
    scopes: [],
  },
})
