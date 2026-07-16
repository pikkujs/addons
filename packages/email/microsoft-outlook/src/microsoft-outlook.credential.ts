import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const microsoftOutlookTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

wireCredential({
  name: 'microsoftOutlook',
  displayName: 'Microsoft Outlook',
  description: 'Microsoft Outlook integration for Pikku',
  type: 'wire',
  schema: microsoftOutlookTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_OUTLOOK_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_OUTLOOK_OAUTH_TOKENS',
    authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scopes: [
      'Mail.ReadWrite',
      'Mail.Send',
      'Calendars.ReadWrite',
      'Contacts.ReadWrite',
      'Place.Read.All',
      'offline_access',
    ],
  },
})

export const microsoftOutlookOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireSecret({
  name: 'microsoftOutlookOAuthApp',
  schema: microsoftOutlookOAuthAppSchema,
  displayName: 'Microsoft Outlook OAuth App',
  description: 'OAuth2 app credentials for Microsoft Outlook',
  secretId: 'MICROSOFT_OUTLOOK_OAUTH_APP',
})
