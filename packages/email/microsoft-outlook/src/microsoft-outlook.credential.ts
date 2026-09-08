import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

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
