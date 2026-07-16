import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderDeleteInput = z.object({
  path: z.string().optional(),
})

export const FolderDeleteOutput = z.record(z.string(), z.unknown())

export const folderDelete = pikkuSessionlessFunc({
  description: "Delete a folder",
  input: FolderDeleteInput,
  output: FolderDeleteOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/folder/delete", data) as any
  },
})
