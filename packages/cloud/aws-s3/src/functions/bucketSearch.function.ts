import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BucketSearchInput = z.object({
  bucket: z.string(),
  query: z.string().optional(),
  limit: z.number().int().optional(),
})

export const BucketSearchOutput = z.record(z.string(), z.unknown())

export const bucketSearch = pikkuSessionlessFunc({
  description: "Search within a bucket",
  input: BucketSearchInput,
  output: BucketSearchOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("GET", "/bucket/{bucket}/search", data) as any
  },
})
