import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDeleteInput = z.object({
  path: z.string().describe("Full path of the file or folder to delete"),
  folder: z.boolean().optional().describe("Whether the target is a folder"),
  recursive: z.boolean().optional().describe("Whether to remove all contents of the target directory"),
})

export const FileDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file or folder",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ ftp }, data) => {
    return ftp.call("POST", "/file/delete", data) as any
  },
})
