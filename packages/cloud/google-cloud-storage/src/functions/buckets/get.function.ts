import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BucketGetInput = z.object({
  bucketName: z.string().describe('Name of the bucket'),
})

export const BucketGetOutput = z.object({
  name: z.string().describe('Bucket name'),
  location: z.string().describe('Bucket location'),
  storageClass: z.string().describe('Storage class'),
  timeCreated: z.string().describe('Creation timestamp'),
  updated: z.string().describe('Last update timestamp'),
})

export const bucketGet = pikkuSessionlessFunc({
  description: 'Get metadata for a Google Cloud Storage bucket',
  node: {
    displayName: 'Get Bucket',
    category: 'Buckets',
    type: 'action',
  },
  input: BucketGetInput,
  output: BucketGetOutput,
  func: async ({ googleCloudStorage }, { bucketName }) => {
    const bucket = await googleCloudStorage.getBucket(bucketName)
    return {
      name: bucket.name,
      location: bucket.location,
      storageClass: bucket.storageClass,
      timeCreated: bucket.timeCreated,
      updated: bucket.updated,
    }
  },
})
