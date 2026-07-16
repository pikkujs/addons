import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const totpBaseUrlSchema = z.enum(["https://totp.local"]).default("https://totp.local")

wireVariable({
  name: 'TOTP_BASE_URL',
  displayName: 'TOTP Base URL',
  description: 'The base URL for the TOTP API.',
  variableId: 'TOTP_BASE_URL',
  schema: totpBaseUrlSchema,
})
