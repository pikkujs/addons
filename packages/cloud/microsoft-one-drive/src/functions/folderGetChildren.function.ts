import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderGetChildrenInput = z.object({
  folderId: z.string(),
})

export const FolderGetChildrenOutput = z.record(z.string(), z.unknown())

export const folderGetChildren = pikkuSessionlessFunc({
  description: "Get folder children",
  input: FolderGetChildrenInput,
  output: FolderGetChildrenOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("GET", "/drive/folders/{folderId}/children", data) as any
  },
})
