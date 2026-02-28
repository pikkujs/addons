import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BucketListInput = z.object({
  prefix: z.string().optional().describe('Filter buckets by name prefix'),
  maxResults: z.number().int().optional().describe('Maximum number of buckets to return'),
  pageToken: z.string().optional().describe('Page token for pagination'),
})

const BucketSummarySchema = z.object({
  name: z.string().describe('Bucket name'),
  location: z.string().describe('Bucket location'),
  storageClass: z.string().describe('Storage class'),
  timeCreated: z.string().describe('Creation timestamp'),
})

export const BucketListOutput = z.object({
  buckets: z.array(BucketSummarySchema).describe('List of buckets'),
  nextPageToken: z.string().optional().describe('Token for next page of results'),
})

export const bucketList = pikkuSessionlessFunc({
  description: 'List Google Cloud Storage buckets in the project',
  node: {
    displayName: 'List Buckets',
    category: 'Buckets',
    type: 'action',
  },
  input: BucketListInput,
  output: BucketListOutput,
  func: async ({ googleCloudStorage }, { prefix, maxResults, pageToken }) => {
    const result = await googleCloudStorage.listBuckets({ prefix, maxResults, pageToken })
    return {
      buckets: (result.items ?? []).map((b) => ({
        name: b.name,
        location: b.location,
        storageClass: b.storageClass,
        timeCreated: b.timeCreated,
      })),
      nextPageToken: result.nextPageToken,
    }
  },
})
