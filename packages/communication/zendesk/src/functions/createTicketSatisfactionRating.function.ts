import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateTicketSatisfactionRatingInput = z.object({
  ticket_id: z.number().int().describe("The id of the ticket. Example: 35436"),
})

export const CreateTicketSatisfactionRatingOutput = z.object({
  satisfaction_rating: z.array(z.object({
    assignee_id: z.number().int().describe("The id of agent assigned to at the time of rating"),
    comment: z.string().optional().describe("The comment received with this rating, if available"),
    created_at: z.string().datetime().optional().describe("The time the satisfaction rating got created"),
    group_id: z.number().int().describe("The id of group assigned to at the time of rating"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    reason: z.string().optional().describe("The reason for a bad rating given by the requester in a follow-up question. Satisfaction reasons must be [enabled](https://support.zendesk.com/hc/en-us/articles/4408886173338)"),
    reason_code: z.number().int().optional().describe("The default reasons the user can select from a list menu for giving a negative rating. See [Reason codes](/api-reference/ticketing/ticket-management/satisfaction_reasons/#reason-codes) in the Satisfaction Reasons API. Can only be set on ratings with a `score` of \"bad\". Responses don't include this property"),
    reason_id: z.number().int().optional().describe("id for the reason the user gave a negative rating. Can only be set on ratings with a `score` of \"bad\". To get a descriptive value for the id, use the [Show Reason for Satisfaction Rating](/api-reference/ticketing/ticket-management/satisfaction_reasons/#show-reason-for-satisfaction-rating) endpoint"),
    requester_id: z.number().int().describe("The id of ticket requester submitting the rating"),
    score: z.string().describe("The rating \"offered\", \"unoffered\", \"good\" or \"bad\". For POST requests, only \"good\" or \"bad\" are valid"),
    ticket_id: z.number().int().describe("The id of ticket being rated"),
    updated_at: z.string().datetime().optional().describe("The time the satisfaction rating got updated"),
    url: z.string().optional().describe("The API url of this rating"),
  })).optional(),
})

export const createTicketSatisfactionRating = pikkuSessionlessFunc({
  description: "Creates a CSAT rating for a solved ticket, or for a ticket that was previously\nsolved and then reopened.\n\nOnly the end user listed as the ticket requester can create a satisfaction rating for the ticket.\n\nOnly \"good\" and \"bad\" are valid values for the score when creating a rating. Other states, like \"offered\", are not valid and will result in a 422 error.\n\n#### Allowed For\n\n* End user who requested the ticket\n\nThe end user must be a verified user.",
  input: CreateTicketSatisfactionRatingInput,
  output: CreateTicketSatisfactionRatingOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/tickets/{ticket_id}/satisfaction_rating", data) as any
  },
})
