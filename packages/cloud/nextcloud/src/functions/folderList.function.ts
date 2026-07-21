import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderListInput = z.object({
  path: z.string().optional(),
})

export const FolderListOutput = z.record(z.string(), z.unknown())

export const folderList = pikkuSessionlessFunc({
  description: "List the contents of a folder",
  input: FolderListInput,
  output: FolderListOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/folder/list", data) as any
  },
})
