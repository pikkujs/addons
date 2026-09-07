import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const salesforceTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'salesforce',
  displayName: 'Salesforce',
  description: 'Salesforce CRM API',
  type: 'wire',
  schema: salesforceTokenSchema,
  oauth2: {
    appCredentialSecretId: 'SALESFORCE_OAUTH_APP',
    tokenSecretId: 'SALESFORCE_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})
