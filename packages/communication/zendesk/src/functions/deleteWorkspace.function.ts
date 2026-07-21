import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteWorkspaceInput = z.object({
  workspace_id: z.number().int().describe("The id of the workspace. Example: 3133"),
})

export const deleteWorkspace = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: DeleteWorkspaceInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/workspaces/{workspace_id}", data)
  },
})
