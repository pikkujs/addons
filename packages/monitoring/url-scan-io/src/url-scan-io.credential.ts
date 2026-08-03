import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const urlScanIoCredentialSchema = z.object({
  apiKey: z.string().describe('urlscanio API key'),
})

defineCredential({
  name: 'urlScanIo',
  displayName: 'urlscanio',
  description: 'urlscanio addon',
  type: 'wire',
  schema: urlScanIoCredentialSchema,
})
