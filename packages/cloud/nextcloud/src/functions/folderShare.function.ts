import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderShareInput = z.object({
  path: z.string().optional(),
  shareType: z.number().int().optional(),
  shareWith: z.string().optional(),
})

export const FolderShareOutput = z.record(z.string(), z.unknown())

export const folderShare = pikkuSessionlessFunc({
  description: "Share a folder",
  input: FolderShareInput,
  output: FolderShareOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/folder/share", data) as any
  },
})
