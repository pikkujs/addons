import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderDeleteInput = z.object({
  folderId: z.string(),
})

export const FolderDeleteOutput = z.record(z.string(), z.unknown())

export const folderDelete = pikkuSessionlessFunc({
  description: "Folder delete",
  input: FolderDeleteInput,
  output: FolderDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/folder/{folderId}", data) as any
  },
})
