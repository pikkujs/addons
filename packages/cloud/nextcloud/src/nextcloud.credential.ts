import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const nextcloudCredentialSchema = z.object({
  apiKey: z.string().describe('Nextcloud API key'),
})

wireCredential({
  name: 'nextcloud',
  displayName: 'Nextcloud',
  description: 'Access files, folders and users on Nextcloud',
  type: 'wire',
  schema: nextcloudCredentialSchema,
})
