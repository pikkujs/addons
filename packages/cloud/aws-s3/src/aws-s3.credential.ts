import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const awsS3CredentialSchema = z.object({
  apiKey: z.string().describe('AWS S3 API key'),
})

wireCredential({
  name: 'awsS3',
  displayName: 'AWS S3',
  description: 'Store and retrieve objects in AWS S3',
  type: 'wire',
  schema: awsS3CredentialSchema,
})
