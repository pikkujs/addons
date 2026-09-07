import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftTeamsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'microsoftTeams',
  displayName: 'Microsoft Teams',
  description: 'Consume the Microsoft Teams (Graph) API',
  type: 'wire',
  schema: microsoftTeamsTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_TEAMS_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_TEAMS_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
