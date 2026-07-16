import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetTicketAttributeValuesInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const SetTicketAttributeValuesOutput = z.object({
  attribute_values: z.array(z.object({
    agent_skill_priority: z.enum(["NORMAL", "HIGH"]).optional().describe("The priority of the agent skill for this attribute value"),
    attribute_id: z.string().optional().describe("Id of the associated attribute"),
    created_at: z.string().datetime().optional().describe("When this record was created"),
    id: z.string().optional().describe("Automatically assigned when an attribute value is created"),
    name: z.string().optional().describe("The name of the attribute value"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("URL of the attribute value"),
  })).optional(),
})

export const setTicketAttributeValues = pikkuSessionlessFunc({
  description: "Adds the specified attributes if no attributes exists, or replaces all existing attributes with the specified attributes.\n\nInvalid or deleted attributes are ignored.\n\n#### Allowed For\n\n* Admins",
  input: SetTicketAttributeValuesInput,
  output: SetTicketAttributeValuesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/routing/tickets/{ticket_id}/instance_values", data) as any
  },
})
