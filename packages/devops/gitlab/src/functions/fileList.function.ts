import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileListInput = z.object({
  projectId: z.string(),
  path: z.string().optional(),
  ref: z.string().optional(),
  recursive: z.boolean().optional(),
  per_page: z.number().int().optional(),
})

export const FileListOutput = z.record(z.string(), z.unknown())

export const fileList = pikkuSessionlessFunc({
  description: "List files",
  input: FileListInput,
  output: FileListOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/repository/tree", data) as any
  },
})
