import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const ftpBaseUrlSchema = z.enum(["https://ftp.local"]).default("https://ftp.local")

defineVariable({
  name: 'FTP_BASE_URL',
  displayName: 'FTP Base URL',
  description: 'The base URL for the FTP API.',
  variableId: 'FTP_BASE_URL',
  schema: ftpBaseUrlSchema,
})
