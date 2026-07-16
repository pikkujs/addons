import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileDeleteInput = z.object({
  bucket: z.string(),
  key: z.string(),
})

export const FileDeleteOutput = z.record(z.string(), z.unknown())

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("DELETE", "/file/{bucket}/{key}", data) as any
  },
})
