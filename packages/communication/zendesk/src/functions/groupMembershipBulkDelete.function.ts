import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupMembershipBulkDeleteInput = z.object({
  ids: z.string().optional().describe("Id of the group memberships to delete. Comma separated. Example: \"1,2,3\""),
})

export const GroupMembershipBulkDeleteOutput = z.object({
  job_status: z.object({
    id: z.string().optional().describe("Automatically assigned when the job is queued"),
    job_type: z.string().optional().describe("The type of the job"),
    message: z.string().nullable().optional().describe("Message from the job worker, if any"),
    progress: z.number().int().nullable().optional().describe("Number of tasks that have already been completed"),
    results: z.union([z.array(z.union([z.object({
      id: z.number().int().describe("the id of the new resource"),
      index: z.number().int().describe("the index number of the resul"),
    }), z.object({
      action: z.string().describe("the action the job attempted (`\"action\": \"update\"`)\n"),
      id: z.number().int().describe("the id of the resource the job attempted to update"),
      status: z.string().describe("the status (`\"status\": \"Updated\"`)\n"),
      success: z.boolean().describe("whether the action was successful or not (`\"success\": true`)\n"),
    }), z.object({
      action: z.string().describe("The action the job attempted (`\"action\": \"update\"`)"),
      details: z.string().describe("The details of the error"),
      error: z.string().describe("The error message"),
      id: z.number().int().describe("The id of the resource the job attempted to update"),
      success: z.boolean().describe("Whether the action was successful or not (`\"success\": true`)"),
    })])), z.object({
      success: z.boolean().describe("Whether the action was successful or not"),
    })]).optional().describe("Result data from processed tasks. See [Results](#results) below"),
    status: z.string().optional().describe("The current status. One of the following: \"queued\", \"working\", \"failed\", \"completed\""),
    total: z.number().int().nullable().optional().describe("The total number of tasks this job is batching through"),
    url: z.string().optional().describe("The URL to poll for status updates"),
  }).optional(),
})

export const groupMembershipBulkDelete = pikkuSessionlessFunc({
  description: "Immediately removes users from groups and schedules a job to unassign all working tickets that are assigned to the given user and group combinations.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage group memberships (Enterprise only)",
  input: GroupMembershipBulkDeleteInput,
  output: GroupMembershipBulkDeleteOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/group_memberships/destroy_many", data) as any
  },
})
