import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileSearchInput = z.object({
  query: z.string(),
})

export const FileSearchOutput = z.record(z.string(), z.unknown())

export const fileSearch = pikkuSessionlessFunc({
  description: "Search files",
  input: FileSearchInput,
  output: FileSearchOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("GET", "/drive/root/search", data) as any
  },
})
