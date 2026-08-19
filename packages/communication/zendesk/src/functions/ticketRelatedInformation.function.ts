import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketRelatedInformationInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const TicketRelatedInformationOutput = z.object({
  followup_source_ids: z.array(z.string()).optional(),
  from_archive: z.boolean().optional().describe("Is true if the current ticket is archived"),
  incidents: z.number().int().optional().describe("A count of related incident occurrences"),
  jira_issue_ids: z.array(z.string()).optional(),
  topic_id: z.string().nullable().optional().describe("Related topic in the Web portal (deprecated feature)"),
})

export const ticketRelatedInformation = pikkuSessionlessFunc({
  description: "The request returns a data object with the following properties:\n\n| Name                | Type    | Comment\n| ------------------- | ------- | -------\n| topic_id            | string  | Related topic in the Web portal (deprecated feature)\n| jira_issue_ids      | array   | Array of associated jira issues\n| followup_source_ids | array   | Sources to follow up\n| from_archive        | boolean | Is true if the current ticket is archived\n| incidents           | integer | A count of related incident occurrences\n\n#### Allowed For\n\n* Agents",
  input: TicketRelatedInformationInput,
  output: TicketRelatedInformationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/related", data) as any
  },
})
