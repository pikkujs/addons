import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderMoveInput = z.object({
  path: z.string().optional(),
  toPath: z.string().optional(),
})

export const FolderMoveOutput = z.record(z.string(), z.unknown())

export const folderMove = pikkuSessionlessFunc({
  description: "Move a folder",
  input: FolderMoveInput,
  output: FolderMoveOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/folder/move", data) as any
  },
})
