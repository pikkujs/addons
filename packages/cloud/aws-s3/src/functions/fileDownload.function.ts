import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDownloadInput = z.object({
  bucket: z.string(),
  key: z.string(),
})

export const FileDownloadOutput = z.record(z.string(), z.unknown())

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ awsS3 }, data) => {
    return awsS3.call("GET", "/file/{bucket}/{key}", data) as any
  },
})
