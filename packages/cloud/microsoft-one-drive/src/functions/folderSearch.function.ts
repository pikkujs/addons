import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FolderSearchInput = z.object({
  query: z.string(),
})

export const FolderSearchOutput = z.record(z.string(), z.unknown())

export const folderSearch = pikkuSessionlessFunc({
  description: "Search folders",
  input: FolderSearchInput,
  output: FolderSearchOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("GET", "/drive/root/folder-search", data) as any
  },
})
