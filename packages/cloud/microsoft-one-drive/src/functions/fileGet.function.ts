import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileGetInput = z.object({
  fileId: z.string(),
})

export const FileGetOutput = z.record(z.string(), z.unknown())

export const fileGet = pikkuSessionlessFunc({
  description: "Get a file",
  input: FileGetInput,
  output: FileGetOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("GET", "/drive/items/{fileId}", data) as any
  },
})
