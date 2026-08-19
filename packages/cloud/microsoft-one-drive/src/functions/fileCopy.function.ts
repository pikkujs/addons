import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileCopyInput = z.object({
  fileId: z.string(),
  name: z.string().optional(),
  parentReference: z.object({
  id: z.string().optional(),
  driveId: z.string().optional(),
}).optional(),
})

export const FileCopyOutput = z.object({
  location: z.string().optional(),
})

export const fileCopy = pikkuSessionlessFunc({
  description: "Copy a file",
  input: FileCopyInput,
  output: FileCopyOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("POST", "/drive/items/{fileId}/copy", data) as any
  },
})
