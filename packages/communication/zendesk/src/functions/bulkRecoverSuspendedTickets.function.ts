import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const BulkRecoverSuspendedTicketsInput = z.object({
  ids: z.string().describe("Comma-separated list of suspended ticket IDs to recover"),
  author: z.object({
  email: z.string().email().optional().describe("Email address to identify the author"),
  id: z.number().int().optional().describe("User ID to set as the author of recovered tickets"),
}).optional(),
})

export const BulkRecoverSuspendedTicketsOutput = z.object({
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

export const bulkRecoverSuspendedTickets = pikkuSessionlessFunc({
  description: "Enqueues a bulk job to recover multiple suspended tickets. Returns a job status that can be tracked via the Job Statuses API.\n\nUnlike the [Recover Multiple Suspended Tickets](#recover-multiple-suspended-tickets) endpoint which processes tickets synchronously, this endpoint queues an asynchronous job for processing large batches.\n\n#### Allowed For\n\n* Admins and [agents in custom roles with permission](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) to manage suspended tickets on Enterprise plans\n* Unrestricted agents on all other plans",
  input: BulkRecoverSuspendedTicketsInput,
  output: BulkRecoverSuspendedTicketsOutput,
  errors: [UnprocessableContentError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/suspended_tickets/bulk_recover", data) as any
  },
})
