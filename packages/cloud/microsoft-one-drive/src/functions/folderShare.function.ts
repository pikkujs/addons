import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderShareInput = z.object({
  folderId: z.string(),
  type: z.string().optional(),
  scope: z.string().optional(),
})

export const FolderShareOutput = z.record(z.string(), z.unknown())

export const folderShare = pikkuSessionlessFunc({
  description: "Create a sharing link for a folder",
  input: FolderShareInput,
  output: FolderShareOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("POST", "/drive/folders/{folderId}/createLink", data) as any
  },
})
