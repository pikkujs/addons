import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileListInput = z.object({
  path: z.string().describe("Path of directory to list contents of"),
  recursive: z.boolean().optional().describe("Whether to list directories recursively"),
})

export const FileListOutput = z.object({
  items: z.array(z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    path: z.string().optional(),
    size: z.number().optional(),
  })).optional(),
})

export const fileList = pikkuSessionlessFunc({
  description: "List folder content",
  input: FileListInput,
  output: FileListOutput,
  func: async ({ ftp }, data) => {
    return ftp.call("POST", "/file/list", data) as any
  },
})
