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
    authorizationUrl: 'https://zoom.us/oauth/authorize',
    tokenUrl: 'https://zoom.us/oauth/token',
    scopes: [
      'meeting:read:meeting',
      'meeting:write:meeting',
      'meeting:update:meeting',
      'meeting:delete:meeting',
      'meeting:read:list_meetings',
    ],
  },
})
