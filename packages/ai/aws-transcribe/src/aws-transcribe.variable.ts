import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const awsTranscribeBaseUrlSchema = z.enum(["https://transcribe.us-east-1.amazonaws.com"]).default("https://transcribe.us-east-1.amazonaws.com")

wireVariable({
  name: 'AWS_TRANSCRIBE_BASE_URL',
  displayName: 'AWS Transcribe Base URL',
  description: 'The base URL for the AWS Transcribe API.',
  variableId: 'AWS_TRANSCRIBE_BASE_URL',
  schema: awsTranscribeBaseUrlSchema,
})
