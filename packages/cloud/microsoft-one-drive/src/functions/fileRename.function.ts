import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileRenameInput = z.object({
  fileId: z.string(),
  name: z.string().optional(),
})

export const FileRenameOutput = z.record(z.string(), z.unknown())

export const fileRename = pikkuSessionlessFunc({
  description: "Rename a file",
  input: FileRenameInput,
  output: FileRenameOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("PATCH", "/drive/items/{fileId}", data) as any
  },
})
