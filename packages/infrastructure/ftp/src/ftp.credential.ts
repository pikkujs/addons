import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const ftpCredentialSchema = z.object({
  apiKey: z.string().describe('FTP API key'),
})

defineCredential({
  name: 'ftp',
  displayName: 'FTP',
  description: 'Transfer files via FTP or SFTP',
  type: 'wire',
  schema: ftpCredentialSchema,
})
