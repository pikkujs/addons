import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const venafiTlsProtectCloudBaseUrlSchema = z.enum(["https://api.venafi.cloud"]).default("https://api.venafi.cloud")

wireVariable({
  name: 'VENAFI_TLS_PROTECT_CLOUD_BASE_URL',
  displayName: 'Venafi TLS Protect Cloud Base URL',
  description: 'The base URL for the Venafi TLS Protect Cloud API.',
  variableId: 'VENAFI_TLS_PROTECT_CLOUD_BASE_URL',
  schema: venafiTlsProtectCloudBaseUrlSchema,
})
