import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleSheetsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'googleSheets',
  displayName: 'Google Sheets',
  description: 'Google Sheets integration for Pikku',
  type: 'wire',
  schema: googleSheetsTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_SHEETS_OAUTH_APP',
    tokenSecretId: 'GOOGLE_SHEETS_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
  },
})
