import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderDeleteInput = z.object({
  bucket: z.string(),
  folderKey: z.string(),
})

export const FolderDeleteOutput = z.record(z.string(), z.unknown())

export const folderDelete = pikkuSessionlessFunc({
  description: "Delete a folder",
  input: FolderDeleteInput,
  output: FolderDeleteOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("DELETE", "/folder/{bucket}/{folderKey}", data) as any
  },
})
