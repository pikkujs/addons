import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DbDataTableRowAttachmentDownloadInput = z.object({
  modelId: z.string().describe("Model ID"),
  columnId: z.string().describe("Column ID"),
  rowId: z.string().describe("Row ID"),
  urlOrPath: z.string().optional().describe("URL or Path of the attachment"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbDataTableRowAttachmentDownloadOutput = z.object({
  url: z.string().optional().describe("URL to download attachment"),
  path: z.string().optional().describe("Path to download attachment"),
})

export const dbDataTableRowAttachmentDownload = pikkuSessionlessFunc({
  description: "Download attachment from a given row",
  input: DbDataTableRowAttachmentDownloadInput,
  output: DbDataTableRowAttachmentDownloadOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/downloadAttachment/{modelId}/{columnId}/{rowId}", data) as any
  },
})
