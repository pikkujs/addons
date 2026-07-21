import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowOrganizationMergeInput = z.object({
  organization_merge_id: z.string().describe("The ID of the organization merge. Example: \"01HPZM6206BF4G63783E5349AD\""),
})

export const ShowOrganizationMergeOutput = z.object({
  organization_merge: z.object({
    id: z.string(),
    loser_id: z.number().int(),
    status: z.enum(["new", "in_progress", "error", "complete"]),
    url: z.string(),
    winner_id: z.number().int(),
  }).optional(),
})

export const showOrganizationMerge = pikkuSessionlessFunc({
  description: "Retrieves the details of a specific organization merge operation. This endpoint is useful for obtaining the status and outcome of a merge that was previously initiated. It provides information such as the winning and losing organization IDs, the status of the merge, and the associated URLs.\n\nThis endpoint can be used to determine if a merge is still in progress, has completed successfully, or has encountered an error.\n\n#### Allowed For\n\n* Admins",
  input: ShowOrganizationMergeInput,
  output: ShowOrganizationMergeOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_merges/{organization_merge_id}", data) as any
  },
})
