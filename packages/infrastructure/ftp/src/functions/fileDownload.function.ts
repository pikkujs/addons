import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FileDownloadInput = z.object({
  path: z.string().describe("Full path of the file to download"),
  binaryPropertyName: z.string().optional().describe("Output binary field name"),
})

export const FileDownloadOutput = z.object({
  path: z.string().optional(),
  fileName: z.string().optional(),
})

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ ftp }, data) => {
    return ftp.call("POST", "/file/download", data) as any
  },
})
