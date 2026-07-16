import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const venafiTlsProtectCloudCredentialSchema = z.object({
  apiKey: z.string().describe('Venafi TLS Protect Cloud API key'),
})

wireCredential({
  name: 'venafiTlsProtectCloud',
  displayName: 'Venafi TLS Protect Cloud',
  description: 'Consume the Venafi TLS Protect Cloud API',
  type: 'wire',
  schema: venafiTlsProtectCloudCredentialSchema,
})
