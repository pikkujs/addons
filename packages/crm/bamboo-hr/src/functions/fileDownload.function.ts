import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileDownloadInput = z.object({
  fileId: z.string(),
})

export const FileDownloadOutput = z.record(z.string(), z.unknown())

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a company file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/files/{fileId}", data) as any
  },
})
