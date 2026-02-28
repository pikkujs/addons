import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BucketCreateInput = z.object({
  name: z.string().describe('Globally unique bucket name'),
  location: z.string().optional().describe('Bucket location (e.g., US, EU, us-central1). Defaults to US'),
  storageClass: z.enum(['STANDARD', 'NEARLINE', 'COLDLINE', 'ARCHIVE']).optional()
    .describe('Storage class for the bucket. Defaults to STANDARD'),
})

export const BucketCreateOutput = z.object({
  name: z.string().describe('Bucket name'),
  location: z.string().describe('Bucket location'),
  storageClass: z.string().describe('Storage class'),
  timeCreated: z.string().describe('Creation timestamp'),
})

export const bucketCreate = pikkuSessionlessFunc({
  description: 'Create a new Google Cloud Storage bucket',
  node: {
    displayName: 'Create Bucket',
    category: 'Buckets',
    type: 'action',
  },
  input: BucketCreateInput,
  output: BucketCreateOutput,
  func: async ({ googleCloudStorage }, { name, location, storageClass }) => {
    const bucket = await googleCloudStorage.createBucket(name, { location, storageClass })
    return {
      name: bucket.name,
      location: bucket.location,
      storageClass: bucket.storageClass,
      timeCreated: bucket.timeCreated,
    }
  },
})
