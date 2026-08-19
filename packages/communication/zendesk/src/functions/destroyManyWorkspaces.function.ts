import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DestroyManyWorkspacesInput = z.object({
  ids: z.array(z.number().int()).describe("The ids of the workspaces to delete. Example: [1,2,3]"),
})

export const DestroyManyWorkspacesOutput = z.string().describe("Empty response")

export const destroyManyWorkspaces = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: DestroyManyWorkspacesInput,
  output: DestroyManyWorkspacesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/workspaces/destroy_many", data) as any
  },
})
