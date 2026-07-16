import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderDeleteInput = z.object({
  folderId: z.string(),
})

export const FolderDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const folderDelete = pikkuSessionlessFunc({
  description: "Delete a folder",
  input: FolderDeleteInput,
  output: FolderDeleteOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("DELETE", "/drive/folders/{folderId}", data) as any
  },
})
