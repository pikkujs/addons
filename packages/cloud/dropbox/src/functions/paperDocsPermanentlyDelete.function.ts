import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaperDocsPermanentlyDeleteInput = z.object({
  doc_id: z.string().optional().describe("The Paper doc ID."),
})

export const PaperDocsPermanentlyDeleteOutput = z.unknown()

export const paperDocsPermanentlyDelete = pikkuSessionlessFunc({
  description: "Permanently deletes the given Paper doc. This operation is final as the doc cannot be recovered.\n\nNote: This action can be performed only by the doc owner.",
  input: PaperDocsPermanentlyDeleteInput,
  output: PaperDocsPermanentlyDeleteOutput,
  func: async ({ dropbox }, data) => {
    return dropbox.call("POST", "/paper/docs/permanently_delete", data) as any
  },
})
