import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderGetAllInput = z.object({
  spaceId: z.string(),
  archived: z.boolean().optional(),
})

export const FolderGetAllOutput = z.record(z.string(), z.unknown())

export const folderGetAll = pikkuSessionlessFunc({
  description: "Folder get all",
  input: FolderGetAllInput,
  output: FolderGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/space/{spaceId}/folder", data) as any
  },
})
