import { z } from 'zod'
import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3CreateBucketInput = z.object({
  bucket: z.string().describe('Bucket name to create'),
})

export const S3CreateBucketOutput = z.object({
  success: z.boolean().describe('Whether the bucket was created'),
  location: z.string().optional().describe('Location of the created bucket'),
})

export const s3CreateBucket = pikkuSessionlessFunc({
  description: 'Create an S3 bucket',
  input: S3CreateBucketInput,
  output: S3CreateBucketOutput,
  node: { displayName: 'S3 Create Bucket', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }, { bucket }) => {
    const result = await s3Client.send(new CreateBucketCommand({ Bucket: bucket }))
    return { success: true, location: result.Location }
  },
})
