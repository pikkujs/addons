import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteTicketPermanentlyInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const DeleteTicketPermanentlyOutput = z.object({
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

export const deleteTicketPermanently = pikkuSessionlessFunc({
  description: "Permanently deletes a soft-deleted ticket. See [Soft delete](https://support.zendesk.com/hc/en-us/articles/4408834005530#topic_zrm_wbj_1db)\nin the Zendesk GDPR docs. To soft delete a ticket, use the [Delete Ticket](#delete-ticket) endpoint.\n\nThis endpoint enqueues a ticket deletion job and returns a payload with the jobs status.\n\nIf the job succeeds, the ticket is permanently deleted. This operation can't be undone.\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work.\nUse the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion.\n\n#### Allowed For\n\n* Agents",
  input: DeleteTicketPermanentlyInput,
  output: DeleteTicketPermanentlyOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/deleted_tickets/{ticket_id}", data) as any
  },
})
