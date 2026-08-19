import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateOrganizationMergeInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
  organization_merge: z.object({
  winner_id: z.number().int().optional().describe("The id of the winning organization."),
}).optional(),
})

export const CreateOrganizationMergeOutput = z.object({
  organization_merge: z.object({
    id: z.string(),
    loser_id: z.number().int(),
    status: z.enum(["new", "in_progress", "error", "complete"]),
    url: z.string(),
    winner_id: z.number().int(),
  }).optional(),
})

export const createOrganizationMerge = pikkuSessionlessFunc({
  description: "Merges two organizations by moving all users, tickets, and domain names from the organization specified by `{organization_id}` to the organization specified by `winner_id`. After the merge:\n\n- The \"losing\" organization will be deleted.\n- Other organization fields and their values will not be carried over to the \"winning\" organization.\n- The merge operation creates an `Organization Merge` record which contains a status indicating the progress of the merge.\n\n**Note**: This operation is irreversible.\n\n#### Merge Statuses\n\n| Status | Description |\n|--------|-------------|\n| new | A job has been queued to merge the two organizations. |\n| in progress | The job to merge the two organizations has started. |\n| error | An error occurred during the merge job. The merge can be retried by repeating the API call. | \n| complete | The merge has been completed successfully. |\n\n#### Allowed For\n\n* Admins",
  input: CreateOrganizationMergeInput,
  output: CreateOrganizationMergeOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/organizations/{organization_id}/merge", data) as any
  },
})
