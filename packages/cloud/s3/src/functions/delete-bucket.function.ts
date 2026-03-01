import { z } from 'zod'
import { DeleteBucketCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3DeleteBucketInput = z.object({
  bucket: z.string().describe('Bucket name to delete'),
})

export const S3DeleteBucketOutput = z.object({
  success: z.boolean().describe('Whether the bucket was deleted'),
})

export const s3DeleteBucket = pikkuSessionlessFunc({
  description: 'Delete an S3 bucket',
  input: S3DeleteBucketInput,
  output: S3DeleteBucketOutput,
  node: { displayName: 'S3 Delete Bucket', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }, { bucket }) => {
    await s3Client.send(new DeleteBucketCommand({ Bucket: bucket }))
    return { success: true }
  },
})
