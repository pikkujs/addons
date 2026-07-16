import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileCreateInput = z.object({
  projectId: z.string(),
  filePath: z.string(),
  branch: z.string().optional(),
  content: z.string().optional(),
  commit_message: z.string().optional(),
  encoding: z.string().optional(),
})

export const FileCreateOutput = z.record(z.string(), z.unknown())

export const fileCreate = pikkuSessionlessFunc({
  description: "Create a file",
  input: FileCreateInput,
  output: FileCreateOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("POST", "/projects/{projectId}/repository/files/{filePath}", data) as any
  },
})
