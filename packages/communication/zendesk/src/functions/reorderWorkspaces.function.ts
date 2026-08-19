import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReorderWorkspacesInput = z.object({
  ids: z.array(z.number()).optional(),
})

export const ReorderWorkspacesOutput = z.string().describe("Empty response")

export const reorderWorkspaces = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: ReorderWorkspacesInput,
  output: ReorderWorkspacesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/workspaces/reorder", data) as any
  },
})
