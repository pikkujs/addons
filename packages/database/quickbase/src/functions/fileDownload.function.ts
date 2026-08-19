import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDownloadInput = z.object({
  tableId: z.string(),
  recordId: z.string(),
  fieldId: z.string(),
  versionNumber: z.string(),
})

export const FileDownloadOutput = z.record(z.string(), z.unknown())

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ quickbase }, data) => {
    return quickbase.call("GET", "/files/{tableId}/{recordId}/{fieldId}/{versionNumber}", data) as any
  },
})
