import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleTasksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleTasksOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'googleTasks',
  displayName: 'Google Tasks',
  description: 'Consume the Google Tasks API',
  type: 'wire',
  schema: googleTasksTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_TASKS_OAUTH_APP',
    tokenSecretId: 'GOOGLE_TASKS_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'googleTasksOAuthApp',
  displayName: 'Google Tasks OAuth App',
  description: 'OAuth2 app credentials for Google Tasks',
  secretId: 'GOOGLE_TASKS_OAUTH_APP',
  schema: googleTasksOAuthAppSchema,
})
