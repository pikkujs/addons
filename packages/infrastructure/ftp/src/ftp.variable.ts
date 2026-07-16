import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const ftpBaseUrlSchema = z.enum(["https://ftp.local"]).default("https://ftp.local")

wireVariable({
  name: 'FTP_BASE_URL',
  displayName: 'FTP Base URL',
  description: 'The base URL for the FTP API.',
  variableId: 'FTP_BASE_URL',
  schema: ftpBaseUrlSchema,
})
