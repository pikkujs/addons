import { z } from 'zod'
import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3CopyObjectInput = z.object({
  sourceBucket: z.string().describe('Source bucket name'),
  sourceKey: z.string().describe('Source object key'),
  destinationBucket: z.string().describe('Destination bucket name'),
  destinationKey: z.string().describe('Destination object key'),
})

export const S3CopyObjectOutput = z.object({
  etag: z.string().optional().describe('ETag of the copied object'),
  lastModified: z.string().optional().describe('Last modified date of the copy'),
})

export const s3CopyObject = pikkuSessionlessFunc({
  description: 'Copy an object within or between S3 buckets',
  input: S3CopyObjectInput,
  output: S3CopyObjectOutput,
  node: { displayName: 'S3 Copy Object', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }, { sourceBucket, sourceKey, destinationBucket, destinationKey }) => {
    const result = await s3Client.send(new CopyObjectCommand({
      CopySource: `${sourceBucket}/${sourceKey}`,
      Bucket: destinationBucket,
      Key: destinationKey,
    }))

    return {
      etag: result.CopyObjectResult?.ETag,
      lastModified: result.CopyObjectResult?.LastModified?.toISOString(),
    }
  },
})
