import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BucketDeleteInput = z.object({
  bucket: z.string(),
})

export const BucketDeleteOutput = z.record(z.string(), z.unknown())

export const bucketDelete = pikkuSessionlessFunc({
  description: "Delete a bucket",
  input: BucketDeleteInput,
  output: BucketDeleteOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("DELETE", "/bucket/{bucket}", data) as any
  },
})
