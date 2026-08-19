import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DestroyManyUsersInput = z.object({
  ids: z.string().optional().describe("Id of the users to delete. Comma separated. Example: \"1,2,3\""),
  external_ids: z.string().optional().describe("External Id of the users to delete. Comma separated. Example: \"abc,def,ghi\""),
  brand_id: z.union([z.literal("0"), z.number().int()]).optional().describe("Scopes the deletion of users matched by `external_ids` to a specific brand\nor to account-scoped (brand-less) users. Only applicable when the account\nhas brand separation enabled (`brand_user_separation_eap`); ignored\notherwise so existing numeric callers continue to behave as before.\n\nAccepted values:\n\n* `0` — restrict the lookup to account-scoped (brand-less) users only.\n* A numeric brand id — restrict to that brand. Brands without\n  `user_separation` enabled collapse to account scope (`0`).\n\nRejected with `400 Bad Request`:\n\n* `all` — cross-brand deletion is not supported on this endpoint.\n* Any other non-numeric string.\n* A numeric brand id that does not exist on the account.\n* Combining `brand_id` with `ids` (use `external_ids` instead — `ids` are\n  globally unique so brand scoping is meaningless).\n\nWhen `external_ids` is provided without `brand_id`, the request defaults\nto account scope (`0`).\n\nWhen forwarded to the bulk-delete background job, the resolved brand id\nis always passed as an Integer (`0` for account scope; the brand id\notherwise) for backward compatibility with existing job consumers.\n. Example: \"0\""),
})

export const DestroyManyUsersOutput = z.object({
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

export const destroyManyUsers = pikkuSessionlessFunc({
  description: "Accepts a comma-separated list of up to 100 user ids.\n\nThe request takes an `ids` or an `external_ids` query parameter.\n\n#### Allowed for\n\n* Admins\n\n#### Response\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion. Only a certain number of jobs can be queued or running at the same time. See [Job limit](/api-reference/introduction/rate-limits/#job-limit) for more information.",
  input: DestroyManyUsersInput,
  output: DestroyManyUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/destroy_many", data) as any
  },
})
