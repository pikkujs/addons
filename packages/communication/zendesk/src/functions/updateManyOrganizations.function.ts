import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateManyOrganizationsInput = z.object({
  ids: z.string().optional().describe("A list of organization ids. Example: \"35436,20057623\""),
  external_ids: z.string().optional().describe("A list of external ids. Example: \"1764,42156\""),
})

export const UpdateManyOrganizationsOutput = z.object({
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

export const updateManyOrganizations = pikkuSessionlessFunc({
  description: "Bulk or batch updates up to 100 organizations.\n\n#### Bulk update\n\nTo make the same change to multiple organizations, use the following endpoint and data format:\n\n`https://{subdomain}.zendesk.com/api/v2/organizations/update_many?ids=1,2,3`\n\n```js\n{\n  \"organization\": {\n    \"notes\": \"Priority\"\n  }\n}\n```\n\n#### Batch update\n\nTo make different changes to multiple organizations, use the following endpoint and data format:\n\n`https://{subdomain}.zendesk.com/api/v2/organizations/update_many`\n\n```js\n{\n  \"organizations\": [\n    { \"id\": 1, \"notes\": \"Priority\" },\n    { \"id\": 2, \"notes\": \"Normal\" }\n  ]\n}\n```\n\n#### Response\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion. Only a certain number of jobs can be queued or running at the same time. See [Job limit](/api-reference/introduction/rate-limits/#job-limit) for more information.\n\n#### Allowed For\n\n* Admins\n* Agents\n\nAgents with no permissions restrictions can only update \"notes\" on organizations.",
  input: UpdateManyOrganizationsInput,
  output: UpdateManyOrganizationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/organizations/update_many", data) as any
  },
})
