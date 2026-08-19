import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowJobStatusInput = z.object({
  job_status_id: z.string().describe("the Id of the Job status. Example: \"8b726e606741012ffc2d782bcb7848fe\""),
})

export const ShowJobStatusOutput = z.object({
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

export const showJobStatus = pikkuSessionlessFunc({
  description: "Shows the status of a background job.\n\n#### Allowed For:\n\n* Agents",
  input: ShowJobStatusInput,
  output: ShowJobStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/job_statuses/{job_status_id}", data) as any
  },
})
