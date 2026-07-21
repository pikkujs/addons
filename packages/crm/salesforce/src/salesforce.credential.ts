import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const salesforceTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const salesforceOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
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

wireSecret({
  name: 'salesforceOAuthApp',
  displayName: 'Salesforce OAuth App',
  description: 'OAuth2 app credentials for Salesforce',
  secretId: 'SALESFORCE_OAUTH_APP',
  schema: salesforceOAuthAppSchema,
})
