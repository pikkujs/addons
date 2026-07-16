import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderGetAllInput = z.object({
  bucket: z.string(),
  limit: z.number().int().optional(),
})

export const FolderGetAllOutput = z.record(z.string(), z.unknown())

export const folderGetAll = pikkuSessionlessFunc({
  description: "List folders in a bucket",
  input: FolderGetAllInput,
  output: FolderGetAllOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("GET", "/folder/{bucket}", data) as any
  },
})
