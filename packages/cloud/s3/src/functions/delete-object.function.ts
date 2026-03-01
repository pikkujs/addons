import { z } from 'zod'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3DeleteObjectInput = z.object({
  bucket: z.string().describe('Bucket name'),
  key: z.string().describe('Object key to delete'),
})

export const S3DeleteObjectOutput = z.object({
  success: z.boolean().describe('Whether the object was deleted'),
})

export const s3DeleteObject = pikkuSessionlessFunc({
  description: 'Delete an object from S3',
  input: S3DeleteObjectInput,
  output: S3DeleteObjectOutput,
  node: { displayName: 'S3 Delete Object', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }, { bucket, key }) => {
    await s3Client.send(new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }))
    return { success: true }
  },
})
