import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderCopyInput = z.object({
  path: z.string().optional(),
  toPath: z.string().optional(),
})

export const FolderCopyOutput = z.record(z.string(), z.unknown())

export const folderCopy = pikkuSessionlessFunc({
  description: "Copy a folder",
  input: FolderCopyInput,
  output: FolderCopyOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/folder/copy", data) as any
  },
})
