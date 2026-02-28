import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BucketDeleteInput = z.object({
  bucketName: z.string().describe('Name of the bucket to delete (must be empty)'),
})

export const BucketDeleteOutput = z.object({
  success: z.boolean().describe('Whether the bucket was deleted'),
})

export const bucketDelete = pikkuSessionlessFunc({
  description: 'Delete an empty Google Cloud Storage bucket',
  node: {
    displayName: 'Delete Bucket',
    category: 'Buckets',
    type: 'action',
  },
  input: BucketDeleteInput,
  output: BucketDeleteOutput,
  func: async ({ googleCloudStorage }, { bucketName }) => {
    await googleCloudStorage.deleteBucket(bucketName)
    return { success: true }
  },
})
