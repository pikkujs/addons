import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderCreateInput = z.object({
  path: z.string().optional(),
})

export const FolderCreateOutput = z.record(z.string(), z.unknown())

export const folderCreate = pikkuSessionlessFunc({
  description: "Create a folder",
  input: FolderCreateInput,
  output: FolderCreateOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("PUT", "/folder/create", data) as any
  },
})
