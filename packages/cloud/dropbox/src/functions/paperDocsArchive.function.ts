import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsArchiveInput = z.object({
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsArchiveOutput = z.unknown()

export const paperDocsArchive = pikkuSessionlessFunc({
  description: "Marks the given Paper doc as archived.\nNote: This action can be performed or undone by anyone with edit permissions to the doc.",
  input: PaperDocsArchiveInput,
  output: PaperDocsArchiveOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/archive", data) as any
  },
})
