import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const salesforceTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const salesforceOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
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
    authorizationUrl: 'https://login.salesforce.com/services/oauth2/authorize',
    tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
    scopes: [
      'api',
      'refresh_token',
    ],
  },
})

defineSecret({
  name: 'salesforceOAuthApp',
  displayName: 'Salesforce OAuth App',
  description: 'OAuth2 app credentials for Salesforce',
  secretId: 'SALESFORCE_OAUTH_APP',
  schema: salesforceOAuthAppSchema,
  optional: true,
})
