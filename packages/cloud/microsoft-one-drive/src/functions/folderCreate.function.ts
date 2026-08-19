import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderCreateInput = z.object({
  name: z.string().optional(),
  parentFolderId: z.string().optional(),
})

export const FolderCreateOutput = z.record(z.string(), z.unknown())

export const folderCreate = pikkuSessionlessFunc({
  description: "Create a folder",
  input: FolderCreateInput,
  output: FolderCreateOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("POST", "/drive/root/children", data) as any
  },
})
