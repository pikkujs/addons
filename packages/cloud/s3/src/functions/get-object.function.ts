import { z } from 'zod'
import { Readable } from 'node:stream'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3GetObjectInput = z.object({
  bucket: z.string().describe('Bucket name'),
  key: z.string().describe('Object key'),
  outputContentKey: z.string().describe('Content key to save the downloaded object'),
})

export const S3GetObjectOutput = z.object({
  outputContentKey: z.string().describe('Content key of the downloaded object'),
  contentType: z.string().optional().describe('Content type of the object'),
  contentLength: z.number().optional().describe('Size of the object in bytes'),
  etag: z.string().optional().describe('ETag of the object'),
  lastModified: z.string().optional().describe('Last modified date'),
})

export const s3GetObject = pikkuSessionlessFunc({
  description: 'Download an object from S3',
  input: S3GetObjectInput,
  output: S3GetObjectOutput,
  node: { displayName: 'S3 Get Object', category: 'Cloud', type: 'action' },
  func: async ({ s3Client, content }, { bucket, key, outputContentKey }) => {
    const result = await s3Client.send(new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }))

    const bodyStream = result.Body as Readable
    await content.writeFile(outputContentKey, bodyStream)

    return {
      outputContentKey,
      contentType: result.ContentType,
      contentLength: result.ContentLength,
      etag: result.ETag,
      lastModified: result.LastModified?.toISOString(),
    }
  },
})
