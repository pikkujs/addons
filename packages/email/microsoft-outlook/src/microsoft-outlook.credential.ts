import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const microsoftOutlookTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'microsoftOutlook',
  displayName: 'Microsoft Outlook',
  description: 'Microsoft Outlook integration for Pikku',
  type: 'wire',
  schema: microsoftOutlookTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_OUTLOOK_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_OUTLOOK_OAUTH_TOKENS',
    authorizationUrl: 'https://example.com/oauth2/authorize',
    tokenUrl: 'https://example.com/oauth2/token',
    scopes: ['read', 'write'],
  },
})

export const microsoftOutlookOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineSecret({
  name: 'microsoftOutlookOAuthApp',
  schema: microsoftOutlookOAuthAppSchema,
  displayName: 'Microsoft Outlook OAuth App',
  description: 'OAuth2 app credentials for Microsoft Outlook',
  secretId: 'MICROSOFT_OUTLOOK_OAUTH_APP',
  optional: true,
})
