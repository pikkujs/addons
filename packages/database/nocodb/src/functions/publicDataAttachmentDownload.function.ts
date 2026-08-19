import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataAttachmentDownloadInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  columnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Column ID"),
  rowId: z.unknown().describe("Unique Row ID"),
  urlOrPath: z.string().optional().describe("URL or Path of the attachment"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicDataAttachmentDownloadOutput = z.object({
  url: z.string().optional().describe("URL to download the attachment"),
  path: z.string().optional().describe("Path to download the attachment"),
})

export const publicDataAttachmentDownload = pikkuSessionlessFunc({
  description: "Download attachment from a shared view",
  input: PublicDataAttachmentDownloadInput,
  output: PublicDataAttachmentDownloadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/public/shared-view/{sharedViewUuid}/downloadAttachment/{columnId}/{rowId}", data) as any
  },
})
