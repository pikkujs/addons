import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const CreateTicketContentPinInput = z.object({
  ticket_content_pin: z.object({
  content_id: z.string().describe("The id of the content to pin"),
  content_type: z.string().describe("The type of content being pinned."),
  locale: z.string().optional().describe("The locale for the content pin. This is required only for articles."),
  ticket_id: z.string().describe("The id of the ticket to which the content pin will be added"),
}).optional(),
})

export const CreateTicketContentPinOutput = z.object({
  account_id: z.string().optional().describe("The ID of the account that owns the content pin."),
  content_id: z.string().optional().describe("The ID of the content that is pinned."),
  content_type: z.string().optional().describe("The type of content that is pinned. Example: external_content"),
  created_at: z.string().datetime().optional().describe("The timestamp when the content pin was created."),
  id: z.string().optional().describe("The unique identifier for the content pin."),
  locale: z.string().nullable().optional().describe("The locale of the content pin."),
  ticket_id: z.string().optional().describe("The ID of the ticket associated with the content pin."),
  url: z.string().optional().describe("The URL to access the pinned content."),
})

export const createTicketContentPin = pikkuSessionlessFunc({
  description: "Creates a new content pin for a specific ticket. Content pins allow you to link to articles, community posts, or external content for easy reference.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: CreateTicketContentPinInput,
  output: CreateTicketContentPinOutput,
  errors: [BadRequestError, ConflictError, UnprocessableContentError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/ticket_content_pins", data) as any
  },
})
