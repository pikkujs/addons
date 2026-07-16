import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileRenameInput = z.object({
  oldPath: z.string().describe("Current full path"),
  newPath: z.string().describe("Destination full path"),
  createDirectories: z.boolean().optional().describe("Whether to create destination directories"),
})

export const FileRenameOutput = z.object({
  success: z.boolean().optional(),
})

export const fileRename = pikkuSessionlessFunc({
  description: "Rename or move a file or folder",
  input: FileRenameInput,
  output: FileRenameOutput,
  func: async ({ ftp }, data) => {
    return ftp.call("POST", "/file/rename", data) as any
  },
})
