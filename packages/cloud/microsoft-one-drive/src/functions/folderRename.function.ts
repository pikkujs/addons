import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderRenameInput = z.object({
  folderId: z.string(),
  name: z.string().optional(),
})

export const FolderRenameOutput = z.record(z.string(), z.unknown())

export const folderRename = pikkuSessionlessFunc({
  description: "Rename a folder",
  input: FolderRenameInput,
  output: FolderRenameOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("PATCH", "/drive/folders/{folderId}", data) as any
  },
})
