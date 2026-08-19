import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderMoveInput = z.object({
  folderId: z.string(),
  name: z.string().optional(),
  parentReference: z.object({
  id: z.string().optional(),
  driveId: z.string().optional(),
}).optional(),
})

export const FolderMoveOutput = z.record(z.string(), z.unknown())

export const folderMove = pikkuSessionlessFunc({
  description: "Move a folder",
  input: FolderMoveInput,
  output: FolderMoveOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("PATCH", "/drive/folders/{folderId}/move", data) as any
  },
})
