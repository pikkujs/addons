import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BucketCreateInput = z.object({
  name: z.string().optional(),
  region: z.string().optional(),
  acl: z.string().optional(),
})

export const BucketCreateOutput = z.record(z.string(), z.unknown())

export const bucketCreate = pikkuSessionlessFunc({
  description: "Create a bucket",
  input: BucketCreateInput,
  output: BucketCreateOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("PUT", "/bucket/create", data) as any
  },
})
