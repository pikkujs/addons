import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const awsTranscribeCredentialSchema = z.object({
  apiKey: z.string().describe('AWS Transcribe API key'),
})

wireCredential({
  name: 'awsTranscribe',
  displayName: 'AWS Transcribe',
  description: 'Sends data to AWS Transcribe',
  type: 'wire',
  schema: awsTranscribeCredentialSchema,
})
