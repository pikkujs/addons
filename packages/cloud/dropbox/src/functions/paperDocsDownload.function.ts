import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsDownloadInput = z.object({
  export_format: z.object({
  ".tag": z.enum(["html", "markdown", "other"]).optional(),
}).optional().describe("The desired export format of the Paper doc.\nhtml: The HTML export format.\nmarkdown: The markdown export format.\nother: None\n"),
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsDownloadOutput = z.object({
  owner: z.string().optional().describe("The Paper doc owner's email address."),
  revision: z.number().optional().describe("The Paper doc revision. Simply an ever increasing number."),
  mime_type: z.string().optional().describe("MIME type of the export. This corresponds to :type:`ExportFormat` specified in the request."),
  title: z.string().optional().describe("The Paper doc title."),
}).describe("owner: The Paper doc owner's email address.\ntitle: The Paper doc title.\nrevision: The Paper doc revision. Simply an ever increasing number.\nmime_type: MIME type of the export. This corresponds to :type:`ExportFormat` specified in the request.\n")

export const paperDocsDownload = pikkuSessionlessFunc({
  description: "Exports and downloads Paper doc either as HTML or markdown.",
  input: PaperDocsDownloadInput,
  output: PaperDocsDownloadOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/download", data) as any
  },
})
