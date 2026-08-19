import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderCreateInput = z.object({
  spaceId: z.string(),
  name: z.string().optional(),
})

export const FolderCreateOutput = z.record(z.string(), z.unknown())

export const folderCreate = pikkuSessionlessFunc({
  description: "Folder create",
  input: FolderCreateInput,
  output: FolderCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/space/{spaceId}/folder", data) as any
  },
})
