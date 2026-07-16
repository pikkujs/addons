import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const zoomTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const zoomOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'zoomOAuthApp',
  displayName: 'Zoom OAuth App',
  description: 'OAuth2 app credentials for Zoom',
  secretId: 'ZOOM_OAUTH_APP',
  schema: zoomOAuthAppSchema,
  optional: true,
})
