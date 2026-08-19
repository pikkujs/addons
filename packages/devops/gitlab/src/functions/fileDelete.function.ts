import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDeleteInput = z.object({
  projectId: z.string(),
  filePath: z.string(),
  branch: z.string().optional(),
  commit_message: z.string().optional(),
})

export const FileDeleteOutput = z.record(z.string(), z.unknown())

export const fileDelete = pikkuSessionlessFunc({
  description: "Delete a file",
  input: FileDeleteInput,
  output: FileDeleteOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("DELETE", "/projects/{projectId}/repository/files/{filePath}", data) as any
  },
})
