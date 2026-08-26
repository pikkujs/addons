import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const harvestTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const harvestOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
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

defineSecret({
  name: 'harvestOAuthApp',
  displayName: 'Harvest OAuth App',
  description: 'OAuth2 app credentials for Harvest',
  secretId: 'HARVEST_OAUTH_APP',
  schema: harvestOAuthAppSchema,
  optional: true,
})
