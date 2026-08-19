import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FileDownloadInput = z.object({
  fileId: z.string(),
})

export const FileDownloadOutput = z.string()

export const fileDownload = pikkuSessionlessFunc({
  description: "Download a file",
  input: FileDownloadInput,
  output: FileDownloadOutput,
  func: async ({ microsoftOneDrive }, data) => {
    return microsoftOneDrive.call("GET", "/drive/items/{fileId}/content", data) as any
  },
})
