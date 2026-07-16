import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteManyMacrosInput = z.object({
  ids: z.array(z.number().int()).describe("The IDs of the macros to delete. Example: [1,2,3]"),
})

export const deleteManyMacros = pikkuSessionlessFunc({
  description: "Deletes the macros corresponding to the provided comma-separated list of IDs.\n\n#### Allowed For\n* Agents",
  input: DeleteManyMacrosInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/macros/destroy_many", data)
  },
})
