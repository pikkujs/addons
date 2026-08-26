import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const microsoftTeamsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const microsoftTeamsOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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

defineSecret({
  name: 'microsoftTeamsOAuthApp',
  displayName: 'Microsoft Teams OAuth App',
  description: 'OAuth2 app credentials for Microsoft Teams',
  secretId: 'MICROSOFT_TEAMS_OAUTH_APP',
  schema: microsoftTeamsOAuthAppSchema,
  optional: true,
})
