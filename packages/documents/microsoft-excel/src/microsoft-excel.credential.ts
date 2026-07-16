import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const microsoftExcelTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const microsoftExcelOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
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

wireSecret({
  name: 'microsoftExcelOAuthApp',
  displayName: 'Microsoft Excel (OneDrive) OAuth App',
  description: 'OAuth2 app credentials for Microsoft Excel (OneDrive)',
  secretId: 'MICROSOFT_EXCEL_OAUTH_APP',
  schema: microsoftExcelOAuthAppSchema,
})
