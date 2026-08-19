import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileCopyInput = z.object({
  path: z.string().optional(),
  toPath: z.string().optional(),
})

export const FileCopyOutput = z.record(z.string(), z.unknown())

export const fileCopy = pikkuSessionlessFunc({
  description: "Copy a file",
  input: FileCopyInput,
  output: FileCopyOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/file/copy", data) as any
  },
})
