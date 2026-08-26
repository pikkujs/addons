import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const gSuiteAdminTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const gSuiteAdminOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'gSuiteAdminOAuthApp',
  displayName: 'Google Workspace Admin OAuth App',
  description: 'OAuth2 app credentials for Google Workspace Admin',
  secretId: 'G_SUITE_ADMIN_OAUTH_APP',
  schema: gSuiteAdminOAuthAppSchema,
  optional: true,
})
