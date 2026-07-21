import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListOrganizationMergesInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const ListOrganizationMergesOutput = z.object({
  organization_merges: z.array(z.object({
    id: z.string().optional(),
    loser_id: z.number().int().optional(),
    status: z.enum(["new", "in_progress", "error", "complete"]).optional(),
    url: z.string().optional(),
    winner_id: z.number().int().optional(),
  })).optional(),
})

export const listOrganizationMerges = pikkuSessionlessFunc({
  description: "Retrieves a list of all organization merge operations associated with a given organization. This endpoint allows you to track the history of merge actions for an organization, including ongoing and completed merges.\n\nEach entry in the list contains details such as the ID of the merge, the winning and losing organization IDs, the current status of the merge, and a URL to access the `Organization Merge` record.\n\n#### Pagination\n\n- Cursor pagination is used for this endpoint.\n- A maximum of 100 records can be returned per page.\n\nSee [Pagination](/api-reference/introduction/pagination/) for more details.\n\n#### Allowed For\n\n* Admins",
  input: ListOrganizationMergesInput,
  output: ListOrganizationMergesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/merges", data) as any
  },
})
