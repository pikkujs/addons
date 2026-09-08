import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const harvestTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
