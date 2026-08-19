import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FolderCreateInput = z.object({
  bucket: z.string().optional(),
  folderName: z.string().optional(),
  folderKey: z.string().optional(),
})

export const FolderCreateOutput = z.record(z.string(), z.unknown())

export const folderCreate = pikkuSessionlessFunc({
  description: "Create a folder",
  input: FolderCreateInput,
  output: FolderCreateOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("PUT", "/folder/create", data) as any
  },
})
