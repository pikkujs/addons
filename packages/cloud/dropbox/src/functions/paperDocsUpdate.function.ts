import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaperDocsUpdateInput = z.object({
  doc_update_policy: z.object({
  ".tag": z.enum(["append", "prepend", "overwrite_all", "other"]).optional(),
}).optional().describe("append: The content will be appended to the doc.\nprepend: The content will be prepended to the doc.\nNote: the doc title will not be affected.\noverwrite_all: The document will be overwitten at the head with the provided content.\nother: None\n"),
  doc_id: z.string().optional().describe("The Paper doc ID."),
  import_format: z.object({
  ".tag": z.enum(["html", "markdown", "plain_text", "other"]).optional(),
}).optional().describe("The import format of the incoming data.\nhtml: The provided data is interpreted as standard HTML.\nmarkdown: The provided data is interpreted as markdown.\nNote: The first line of the provided document will be used as the doc title.\nplain_text: The provided data is interpreted as plain text.\nNote: The first line of the provided document will be used as the doc title.\nother: None\n"),
  revision: z.number().optional().describe("The latest doc revision. This value must match the head revision or an error code will be returned. This is to prevent colliding writes."),
})

export const PaperDocsUpdateOutput = z.object({
  title: z.string().optional().describe("The Paper doc title."),
  doc_id: z.string().optional().describe("Doc ID of the newly created doc."),
  revision: z.number().optional().describe("The Paper doc revision. Simply an ever increasing number."),
}).describe("doc_id: Doc ID of the newly created doc.\nrevision: The Paper doc revision. Simply an ever increasing number.\ntitle: The Paper doc title.\n")

export const paperDocsUpdate = pikkuSessionlessFunc({
  description: "Updates an existing Paper doc with the provided content.",
  input: PaperDocsUpdateInput,
  output: PaperDocsUpdateOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/update", data) as any
  },
})
