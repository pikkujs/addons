import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const urlScanIoBaseUrlSchema = z.enum(["https://urlscan.io/api/v1"]).default("https://urlscan.io/api/v1")

defineVariable({
  name: 'URL_SCAN_IO_BASE_URL',
  displayName: 'urlscanio Base URL',
  description: 'The base URL for the urlscanio API.',
  variableId: 'URL_SCAN_IO_BASE_URL',
  schema: urlScanIoBaseUrlSchema,
})
