import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftExcelTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'microsoftExcel',
  displayName: 'Microsoft Excel (OneDrive)',
  description: 'Consume the Microsoft Excel API for workbooks stored in OneDrive',
  type: 'wire',
  schema: microsoftExcelTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_EXCEL_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_EXCEL_OAUTH_TOKENS',
    authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scopes: [
      'Files.ReadWrite',
      'offline_access',
    ],
  },
})
