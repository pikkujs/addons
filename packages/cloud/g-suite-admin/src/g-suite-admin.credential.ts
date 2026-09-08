import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const gSuiteAdminTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'gSuiteAdmin',
  displayName: 'Google Workspace Admin',
  description: 'Manage Google Workspace users and groups via the Admin SDK Directory API',
  type: 'wire',
  schema: gSuiteAdminTokenSchema,
  oauth2: {
    appCredentialSecretId: 'G_SUITE_ADMIN_OAUTH_APP',
    tokenSecretId: 'G_SUITE_ADMIN_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})
