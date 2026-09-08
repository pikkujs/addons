import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const dropboxTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'dropbox',
  displayName: 'Dropbox',
  description: 'Dropbox integration for Pikku',
  type: 'wire',
  schema: dropboxTokenSchema,
  oauth2: {
    appCredentialSecretId: 'DROPBOX_OAUTH_APP',
    tokenSecretId: 'DROPBOX_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
