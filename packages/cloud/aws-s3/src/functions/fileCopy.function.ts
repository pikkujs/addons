import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileCopyInput = z.object({
  sourcePath: z.string().optional(),
  destinationBucket: z.string().optional(),
  destinationKey: z.string().optional(),
})

export const FileCopyOutput = z.record(z.string(), z.unknown())

export const fileCopy = pikkuSessionlessFunc({
  description: "Copy a file",
  input: FileCopyInput,
  output: FileCopyOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("PUT", "/file/copy", data) as any
  },
})
