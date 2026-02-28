import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BucketUpdateInput = z.object({
  bucketName: z.string().describe('Name of the bucket to update'),
  storageClass: z.enum(['STANDARD', 'NEARLINE', 'COLDLINE', 'ARCHIVE']).optional()
    .describe('Storage class for the bucket'),
  versioning: z.boolean().optional().describe('Enable or disable object versioning'),
  labels: z.record(z.string(), z.string()).optional().describe('Labels to set on the bucket'),
  defaultEventBasedHold: z.boolean().optional()
    .describe('Whether new objects have event-based hold enabled by default'),
})

export const BucketUpdateOutput = z.object({
  name: z.string().describe('Bucket name'),
  location: z.string().describe('Bucket location'),
  storageClass: z.string().describe('Storage class'),
  updated: z.string().describe('Last update timestamp'),
})

export const bucketUpdate = pikkuSessionlessFunc({
  description: 'Update metadata for a Google Cloud Storage bucket',
  node: {
    displayName: 'Update Bucket',
    category: 'Buckets',
    type: 'action',
  },
  input: BucketUpdateInput,
  output: BucketUpdateOutput,
  func: async ({ googleCloudStorage }, { bucketName, storageClass, versioning, labels, defaultEventBasedHold }) => {
    const body: Record<string, unknown> = {}
    if (storageClass) body.storageClass = storageClass
    if (versioning !== undefined) body.versioning = { enabled: versioning }
    if (labels) body.labels = labels
    if (defaultEventBasedHold !== undefined) body.defaultEventBasedHold = defaultEventBasedHold

    const bucket = await googleCloudStorage.updateBucket(bucketName, body)
    return {
      name: bucket.name,
      location: bucket.location,
      storageClass: bucket.storageClass,
      updated: bucket.updated,
    }
  },
})
