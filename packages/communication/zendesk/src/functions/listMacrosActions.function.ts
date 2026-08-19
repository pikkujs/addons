import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListMacrosActionsOutput = z.object({
  actions: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const listMacrosActions = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Agents",
  output: ListMacrosActionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/macros/actions") as any
  },
})
