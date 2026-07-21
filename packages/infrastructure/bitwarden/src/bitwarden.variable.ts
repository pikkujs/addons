import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const bitwardenBaseUrlSchema = z.enum(["https://api.bitwarden.com"]).default("https://api.bitwarden.com")

wireVariable({
  name: 'BITWARDEN_BASE_URL',
  displayName: 'Bitwarden Base URL',
  description: 'The base URL for the Bitwarden API.',
  variableId: 'BITWARDEN_BASE_URL',
  schema: bitwardenBaseUrlSchema,
})
