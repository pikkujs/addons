import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderGetInput = z.object({
  folderId: z.string(),
})

export const FolderGetOutput = z.record(z.string(), z.unknown())

export const folderGet = pikkuSessionlessFunc({
  description: "Folder get",
  input: FolderGetInput,
  output: FolderGetOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/folder/{folderId}", data) as any
  },
})
