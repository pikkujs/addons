import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const awsS3BaseUrlSchema = z.enum(["https://s3.amazonaws.com"]).default("https://s3.amazonaws.com")

wireVariable({
  name: 'AWS_S3_BASE_URL',
  displayName: 'AWS S3 Base URL',
  description: 'The base URL for the AWS S3 API.',
  variableId: 'AWS_S3_BASE_URL',
  schema: awsS3BaseUrlSchema,
})
