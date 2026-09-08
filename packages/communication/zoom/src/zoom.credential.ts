import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const zoomTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'zoom',
  displayName: 'Zoom',
  description: 'Zoom meetings API',
  type: 'wire',
  schema: zoomTokenSchema,
  oauth2: {
    appCredentialSecretId: 'ZOOM_OAUTH_APP',
    tokenSecretId: 'ZOOM_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
