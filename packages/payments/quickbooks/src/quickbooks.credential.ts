import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const quickbooksTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'quickbooks',
  displayName: 'QuickBooks Online',
  description: 'Consume the QuickBooks Online accounting API',
  type: 'wire',
  schema: quickbooksTokenSchema,
  oauth2: {
    appCredentialSecretId: 'QUICKBOOKS_OAUTH_APP',
    tokenSecretId: 'QUICKBOOKS_OAUTH_TOKENS',
    authorizationUrl: 'https://appcenter.intuit.com/connect/oauth2',
    tokenUrl: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    scopes: [
      'com.intuit.quickbooks.accounting',
    ],
  },
})
