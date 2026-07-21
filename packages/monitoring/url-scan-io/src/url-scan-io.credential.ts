import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const urlScanIoCredentialSchema = z.object({
  apiKey: z.string().describe('urlscanio API key'),
})

wireCredential({
  name: 'urlScanIo',
  displayName: 'urlscanio',
  description: 'urlscanio addon',
  type: 'wire',
  schema: urlScanIoCredentialSchema,
})
