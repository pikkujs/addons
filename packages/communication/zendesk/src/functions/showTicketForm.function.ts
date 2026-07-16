import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowTicketFormInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
})

export const ShowTicketFormOutput = z.object({
  ticket_form: z.object({
    active: z.boolean().optional().describe("If the form is set as active"),
    agent_conditions: z.array(z.record(z.string(), z.unknown())).optional().describe("Array of condition sets for agent workspaces"),
    created_at: z.string().datetime().optional().describe("The time the ticket form was created"),
    default: z.boolean().optional().describe("Is the form the default form for this account"),
    deleted_at: z.string().datetime().optional().describe("The time the ticket form was deleted"),
    display_name: z.string().optional().describe("The name of the form that is displayed to an end user"),
    end_user_conditions: z.array(z.record(z.string(), z.unknown())).optional().describe("Array of condition sets for end user products"),
    end_user_visible: z.boolean().optional().describe("Is the form visible to the end user"),
    id: z.number().int().optional().describe("Automatically assigned when creating ticket form"),
    in_all_brands: z.boolean().optional().describe("Is the form available for use in all brands on this account"),
    name: z.string().describe("The name of the form"),
    position: z.number().int().optional().describe("The position of this form among other forms in the account, i.e. dropdown"),
    raw_display_name: z.string().optional().describe("The dynamic content placeholder, if present, or the \"display_name\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_name: z.string().optional().describe("The dynamic content placeholder, if present, or the \"name\" value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    restricted_brand_ids: z.array(z.number().int()).optional().describe("IDs of all brands that this ticket form is restricted to"),
    ticket_field_ids: z.array(z.number().int()).optional().describe("IDs of all ticket fields which are in this ticket form. The products use the order of the IDs to show the field values in the tickets"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the ticket form"),
    url: z.string().optional().describe("URL of the ticket form"),
  }).optional(),
})

export const showTicketForm = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents, and End Users",
  input: ShowTicketFormInput,
  output: ShowTicketFormOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_forms/{ticket_form_id}", data) as any
  },
})
