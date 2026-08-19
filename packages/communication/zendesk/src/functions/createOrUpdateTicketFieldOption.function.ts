import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateOrUpdateTicketFieldOptionInput = z.object({
  ticket_field_id: z.number().int().describe("The ID of the ticket field. Example: 34"),
})

export const CreateOrUpdateTicketFieldOptionOutput = z.object({
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

export const createOrUpdateTicketFieldOption = pikkuSessionlessFunc({
  description: "Creates or updates an option for the given drop-down ticket field.\n\nTo update an option, include the id of the option in the `custom_field_option` object. Example:\n\n`{\"custom_field_option\": {\"id\": 10002, \"name\": \"Pineapples\", ... }`\n\nIf an option exists for the given ID, the option will be updated. Otherwise, a new option will be created.\n\n#### Response\n\nReturns one of the following status codes:\n\n- 200 with `Location: /api/v2/ticket_fields/{ticket_field_id}/options` if the ticket field option already exists in the database\n- 201 with `Location: /api/v2/ticket_fields/{ticket_field_id}/options` if the ticket field option is new\n\n#### Allowed For\n\n* Admins\n\n#### Rate Limit\nYou can make 100 requests every 1 minute using this endpoint.\nThe rate limiting mechanism behaves as described in\n[Monitoring your request activity](/api-reference/ticketing/account-configuration/usage_limits/#monitoring-your-request-activity) in the API introduction.\n\n#### Field Option Limits\n\n* 2000 options per ticket field",
  input: CreateOrUpdateTicketFieldOptionInput,
  output: CreateOrUpdateTicketFieldOptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/ticket_fields/{ticket_field_id}/options", data) as any
  },
})
