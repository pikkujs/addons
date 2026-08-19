import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileShareInput = z.object({
  path: z.string().optional(),
  shareType: z.number().int().optional(),
  shareWith: z.string().optional(),
})

export const FileShareOutput = z.record(z.string(), z.unknown())

export const fileShare = pikkuSessionlessFunc({
  description: "Share a file",
  input: FileShareInput,
  output: FileShareOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/file/share", data) as any
  },
})
