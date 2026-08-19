import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaperDocsCreateInput = z.object({
  parent_folder_id: z.string().optional().describe("The Paper folder ID where the Paper document should be created. The API user has to have write access to this folder or error is thrown."),
  import_format: z.object({
  ".tag": z.enum(["html", "markdown", "plain_text", "other"]).optional(),
}).optional().describe("The import format of the incoming data.\nhtml: The provided data is interpreted as standard HTML.\nmarkdown: The provided data is interpreted as markdown.\nNote: The first line of the provided document will be used as the doc title.\nplain_text: The provided data is interpreted as plain text.\nNote: The first line of the provided document will be used as the doc title.\nother: None\n"),
})

export const PaperDocsCreateOutput = z.object({
  title: z.string().optional().describe("The Paper doc title."),
  doc_id: z.string().optional().describe("Doc ID of the newly created doc."),
  revision: z.number().optional().describe("The Paper doc revision. Simply an ever increasing number."),
}).describe("doc_id: Doc ID of the newly created doc.\nrevision: The Paper doc revision. Simply an ever increasing number.\ntitle: The Paper doc title.\n")

export const paperDocsCreate = pikkuSessionlessFunc({
  description: "Creates a new Paper doc with the provided content.",
  input: PaperDocsCreateInput,
  output: PaperDocsCreateOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/create", data) as any
  },
})
