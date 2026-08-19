import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileGetInput = z.object({
  projectId: z.string(),
  filePath: z.string(),
  ref: z.string().optional(),
})

export const FileGetOutput = z.record(z.string(), z.unknown())

export const fileGet = pikkuSessionlessFunc({
  description: "Get a file",
  input: FileGetInput,
  output: FileGetOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/repository/files/{filePath}", data) as any
  },
})
