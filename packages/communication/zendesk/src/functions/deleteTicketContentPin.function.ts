import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const DeleteTicketContentPinInput = z.object({
  content_pin_id: z.string().describe("The id of the content pin to delete. Example: \"01HFS51MMTVW7CMVEV5V51NYV5\""),
})

export const DeleteTicketContentPinOutput = z.object({
  account_id: z.string().optional().describe("The ID of the account that owns the content pin."),
  content_id: z.string().optional().describe("The ID of the content that is pinned."),
  content_type: z.string().optional().describe("The type of content that is pinned. Example: external_content"),
  created_at: z.string().datetime().optional().describe("The timestamp when the content pin was created."),
  id: z.string().optional().describe("The unique identifier for the content pin."),
  locale: z.string().nullable().optional().describe("The locale of the content pin."),
  ticket_id: z.string().optional().describe("The ID of the ticket associated with the content pin."),
  url: z.string().optional().describe("The URL to access the pinned content."),
})

export const deleteTicketContentPin = pikkuSessionlessFunc({
  description: "Deletes a specific content pin from a ticket.\n\n#### Allowed For\n\n* Agents",
  input: DeleteTicketContentPinInput,
  output: DeleteTicketContentPinOutput,
  errors: [NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_content_pins/{content_pin_id}", data) as any
  },
})
