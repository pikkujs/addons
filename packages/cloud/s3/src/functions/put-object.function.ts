import { z } from 'zod'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3PutObjectInput = z.object({
  bucket: z.string().describe('Bucket name'),
  key: z.string().describe('Object key'),
  contentKey: z.string().describe('Content key of the file to upload'),
  contentType: z.string().optional().describe('Content type (MIME type)'),
})

export const S3PutObjectOutput = z.object({
  etag: z.string().optional().describe('ETag of the uploaded object'),
})

export const s3PutObject = pikkuSessionlessFunc({
  description: 'Upload an object to S3',
  input: S3PutObjectInput,
  output: S3PutObjectOutput,
  node: { displayName: 'S3 Put Object', category: 'Cloud', type: 'action' },
  func: async ({ s3Client, content }, { bucket, key, contentKey, contentType }) => {
    const buffer = await content.readFileAsBuffer(contentKey)

    const result = await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }))

    return { etag: result.ETag }
  },
})
