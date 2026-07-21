import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupMembershipBulkCreateInput = z.object({
  group_memberships: z.array(z.object({
  default: z.boolean().optional().describe("If true, tickets assigned directly to the agent will assume this membership's group"),
  group_id: z.number().int().describe("The id of a group"),
  user_id: z.number().int().describe("The id of an agent"),
})).max(100).describe("An array of group membership objects to create. Maximum 100 items"),
})

export const GroupMembershipBulkCreateOutput = z.object({
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

export const groupMembershipBulkCreate = pikkuSessionlessFunc({
  description: "Assigns up to 100 agents to given groups.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage group memberships (Enterprise only)\n\n#### Response\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion.",
  input: GroupMembershipBulkCreateInput,
  output: GroupMembershipBulkCreateOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/group_memberships/create_many", data) as any
  },
})
