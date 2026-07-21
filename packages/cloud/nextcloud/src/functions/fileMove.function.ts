import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileMoveInput = z.object({
  path: z.string().optional(),
  toPath: z.string().optional(),
})

export const FileMoveOutput = z.record(z.string(), z.unknown())

export const fileMove = pikkuSessionlessFunc({
  description: "Move a file",
  input: FileMoveInput,
  output: FileMoveOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/file/move", data) as any
  },
})
