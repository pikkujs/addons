import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderUpdateInput = z.object({
  folderId: z.string(),
  name: z.string().optional(),
})

export const FolderUpdateOutput = z.record(z.string(), z.unknown())

export const folderUpdate = pikkuSessionlessFunc({
  description: "Folder update",
  input: FolderUpdateInput,
  output: FolderUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/folder/{folderId}", data) as any
  },
})
