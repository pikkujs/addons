import { z } from 'zod'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3ListObjectsInput = z.object({
  bucket: z.string().describe('Bucket name'),
  prefix: z.string().optional().describe('Key prefix to filter objects'),
  maxKeys: z.number().optional().describe('Maximum number of keys to return'),
  continuationToken: z.string().optional().describe('Token for pagination'),
  delimiter: z.string().optional().describe('Delimiter for grouping (e.g. "/" for folder-like listing)'),
})

export const S3ListObjectsOutput = z.object({
  objects: z.array(z.object({
    key: z.string(),
    size: z.number(),
    lastModified: z.string().optional(),
    etag: z.string().optional(),
  })).describe('List of objects'),
  commonPrefixes: z.array(z.string()).optional().describe('Common prefixes (folders) when using delimiter'),
  count: z.number().describe('Number of objects returned'),
  isTruncated: z.boolean().describe('Whether there are more results'),
  nextContinuationToken: z.string().optional().describe('Token for next page'),
})

export const s3ListObjects = pikkuSessionlessFunc({
  description: 'List objects in an S3 bucket',
  input: S3ListObjectsInput,
  output: S3ListObjectsOutput,
  node: { displayName: 'S3 List Objects', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }, { bucket, prefix, maxKeys, continuationToken, delimiter }) => {
    const result = await s3Client.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      MaxKeys: maxKeys,
      ContinuationToken: continuationToken,
      Delimiter: delimiter,
    }))

    const objects = (result.Contents ?? []).map((obj) => ({
      key: obj.Key!,
      size: obj.Size ?? 0,
      lastModified: obj.LastModified?.toISOString(),
      etag: obj.ETag,
    }))

    const commonPrefixes = result.CommonPrefixes?.map((cp) => cp.Prefix!).filter(Boolean)

    return {
      objects,
      commonPrefixes: commonPrefixes?.length ? commonPrefixes : undefined,
      count: objects.length,
      isTruncated: result.IsTruncated ?? false,
      nextContinuationToken: result.NextContinuationToken,
    }
  },
})
