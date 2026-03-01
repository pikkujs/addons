import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const s3SecretsSchema = z.object({
  accessKeyId: z.string().describe('AWS access key ID'),
  secretAccessKey: z.string().describe('AWS secret access key'),
  region: z.string().optional().describe('AWS region (default: us-east-1)'),
  endpoint: z.string().optional().describe('Custom S3 endpoint URL (for MinIO, DigitalOcean Spaces, etc.)'),
  forcePathStyle: z.boolean().optional().describe('Use path-style addressing (required for MinIO)'),
})

export type S3Secrets = z.infer<typeof s3SecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'S3 Credentials',
  description: 'S3-compatible object storage credentials',
  secretId: 'S3_CREDENTIALS',
  schema: s3SecretsSchema,
})
