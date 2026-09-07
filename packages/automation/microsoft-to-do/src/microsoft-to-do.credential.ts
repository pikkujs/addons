import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftToDoTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'microsoftToDo',
  displayName: 'Microsoft To Do',
  description: 'Consume the Microsoft To Do API (tasks, lists, linked resources).',
  type: 'wire',
  schema: microsoftToDoTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_TO_DO_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_TO_DO_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
