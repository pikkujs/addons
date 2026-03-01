import { z } from 'zod'
import { ListBucketsCommand } from '@aws-sdk/client-s3'
import { pikkuSessionlessFunc } from '#pikku'

export const S3ListBucketsInput = z.object({})

export const S3ListBucketsOutput = z.object({
  buckets: z.array(z.object({
    name: z.string(),
    creationDate: z.string().optional(),
  })).describe('List of buckets'),
  count: z.number().describe('Number of buckets'),
})

export const s3ListBuckets = pikkuSessionlessFunc({
  description: 'List all S3 buckets',
  input: S3ListBucketsInput,
  output: S3ListBucketsOutput,
  node: { displayName: 'S3 List Buckets', category: 'Cloud', type: 'action' },
  func: async ({ s3Client }) => {
    const result = await s3Client.send(new ListBucketsCommand({}))
    const buckets = (result.Buckets ?? []).map((b) => ({
      name: b.Name!,
      creationDate: b.CreationDate?.toISOString(),
    }))
    return { buckets, count: buckets.length }
  },
})
