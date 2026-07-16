import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileEditInput = z.object({
  projectId: z.string(),
  filePath: z.string(),
  branch: z.string().optional(),
  content: z.string().optional(),
  commit_message: z.string().optional(),
  encoding: z.string().optional(),
})

export const FileEditOutput = z.record(z.string(), z.unknown())

export const fileEdit = pikkuSessionlessFunc({
  description: "Edit a file",
  input: FileEditInput,
  output: FileEditOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("PUT", "/projects/{projectId}/repository/files/{filePath}", data) as any
  },
})
