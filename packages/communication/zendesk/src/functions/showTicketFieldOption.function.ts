import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowTicketFieldOptionInput = z.object({
  ticket_field_id: z.number().int().describe("The ID of the ticket field. Example: 34"),
  ticket_field_option_id: z.number().int().describe("The ID of the ticket field option. Example: 10001"),
})

export const ShowTicketFieldOptionOutput = z.object({
  custom_field_option: z.object({
    allow_solving: z.boolean().optional().describe("Whether selecting this option allows solving the ticket when the field is required to solve"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Name of the dropdown option"),
    position: z.number().int().optional().describe("Position of the dropdown option"),
    raw_name: z.string().optional().describe("Raw name of the dropdown option"),
    url: z.string().optional().describe("URL of the dropdown option"),
    value: z.string().describe("Value of the dropdown option"),
  }).optional(),
})

export const showTicketFieldOption = pikkuSessionlessFunc({
  description: "#### Allowed for\n* Agents",
  input: ShowTicketFieldOptionInput,
  output: ShowTicketFieldOptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_fields/{ticket_field_id}/options/{ticket_field_option_id}", data) as any
  },
})
