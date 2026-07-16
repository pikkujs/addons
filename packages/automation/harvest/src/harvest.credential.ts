import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const harvestTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const harvestOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'harvest',
  displayName: 'Harvest',
  description: 'Harvest addon',
  type: 'wire',
  schema: harvestTokenSchema,
  oauth2: {
    appCredentialSecretId: 'HARVEST_OAUTH_APP',
    tokenSecretId: 'HARVEST_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

wireSecret({
  name: 'harvestOAuthApp',
  displayName: 'Harvest OAuth App',
  description: 'OAuth2 app credentials for Harvest',
  secretId: 'HARVEST_OAUTH_APP',
  schema: harvestOAuthAppSchema,
})
