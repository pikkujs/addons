import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDeleteInput = z.object({
  path: z.string().optional(),
})

export const FileDeleteOutput = z.record(z.string(), z.unknown())

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/file/delete", data) as any
  },
})
