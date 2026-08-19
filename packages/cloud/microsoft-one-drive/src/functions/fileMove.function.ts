import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileMoveInput = z.object({
  fileId: z.string(),
  name: z.string().optional(),
  parentReference: z.object({
  id: z.string().optional(),
  driveId: z.string().optional(),
}).optional(),
})

export const FileMoveOutput = z.record(z.string(), z.unknown())

export const fileMove = pikkuSessionlessFunc({
  description: "Move a file",
  input: FileMoveInput,
  output: FileMoveOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("PATCH", "/drive/items/{fileId}/move", data) as any
  },
})
