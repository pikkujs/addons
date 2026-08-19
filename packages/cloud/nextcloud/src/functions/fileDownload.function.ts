import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDownloadInput = z.object({
  path: z.string().optional(),
  binaryPropertyName: z.string().optional(),
})

export const FileDownloadOutput = z.record(z.string(), z.unknown())

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ nextcloud }, data) => {
    return nextcloud.call("POST", "/file/download", data) as any
  },
})
