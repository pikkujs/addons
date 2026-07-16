import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileGetAllInput = z.object({
  bucket: z.string(),
  limit: z.number().int().optional(),
})

export const FileGetAllOutput = z.record(z.string(), z.unknown())

export const fileGetAll = pikkuSessionlessFunc({
  description: "List files in a bucket",
  input: FileGetAllInput,
  output: FileGetAllOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("GET", "/file/{bucket}", data) as any
  },
})
