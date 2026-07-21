import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MergeTicketsIntoTargetTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  ids: z.array(z.number().int()).describe("Ids of tickets to merge into the target ticket"),
  source_comment: z.string().optional().describe("Private comment to add to the source ticket"),
  source_comment_is_public: z.boolean().optional().describe("Whether comment in source tickets are public or private"),
  target_comment: z.string().optional().describe("Private comment to add to the target ticket"),
  target_comment_is_public: z.boolean().optional().describe("Whether comment in target ticket is public or private"),
})

export const MergeTicketsIntoTargetTicketOutput = z.object({
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

export const mergeTicketsIntoTargetTicket = pikkuSessionlessFunc({
  description: "Merges one or more tickets into the ticket with the specified id.\n\nSee [Merging tickets](https://support.zendesk.com/hc/en-us/articles/4408882445594)\nin the Support Help Center for ticket merging rules.\n\nAny attachment to the source ticket is copied to the target ticket.\n\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion. Only a certain number of jobs can be queued or running at the same time. See [Job limit](/api-reference/introduction/rate-limits/#job-limit) for more information.\n\n#### Allowed For\n\n* Agents\n\nAgents in the Enterprise account must have merge permissions.\nSee [Creating custom roles and assigning agents](https://support.zendesk.com/hc/en-us/articles/4408882153882) in Zendesk help.\n\n#### Available parameters\n\nThe request takes a data object with the following properties:\n\n| Name                     | Type    | Required | Comments                                                |\n| ------------------------ | ------- | -------- | ------------------------------------------------------- |\n| ids                      | array   | yes      | Ids of tickets to merge into the target ticket          |\n| target_comment           | string  | no       | Private comment to add to the target ticket. This comment is optional but strongly recommended |\n| source_comment           | string  | no       | Private comment to add to the source ticket. This comment is optional but strongly recommended |\n| target_comment_is_public | boolean | no       | Whether comments in the target ticket are public or private   |\n| source_comment_is_public | boolean | no       | Whether comments in the source tickets are public or private |\n\n`target_comment` and `source_comment` can be used to provide a reason for the merge for recordkeeping purposes. If the source ticket has attachments, they are included in `target_comment`.\n\nComments are private and can't be modified in the following cases:\n\n  * Any of the sources or target tickets are private\n  * Any of the sources or target tickets were created through X (formerly Twitter), Facebook or the Channel framework\n\nIn any other case, comments default to private but can be modified with the comment privacy parameters.",
  input: MergeTicketsIntoTargetTicketInput,
  output: MergeTicketsIntoTargetTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/tickets/{ticket_id}/merge", data) as any
  },
})
