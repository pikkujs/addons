import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BucketGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const BucketGetAllOutput = z.record(z.string(), z.unknown())

export const bucketGetAll = pikkuSessionlessFunc({
  description: "List all buckets",
  input: BucketGetAllInput,
  output: BucketGetAllOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("GET", "/buckets", data) as any
  },
})
