import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteMacroInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro. Example: 25"),
})

export const deleteMacro = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Agents, with restrictions applying on certain actions",
  input: DeleteMacroInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/macros/{macro_id}", data)
  },
})
