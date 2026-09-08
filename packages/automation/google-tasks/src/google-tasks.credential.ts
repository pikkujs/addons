import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleTasksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
