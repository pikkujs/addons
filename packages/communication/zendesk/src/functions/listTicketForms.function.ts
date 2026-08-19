import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketFormsInput = z.object({
  active: z.boolean().optional().describe("true returns active ticket forms; false returns inactive ticket forms. If not present, returns both"),
  end_user_visible: z.boolean().optional().describe("true returns ticket forms where `end_user_visible`; false returns ticket forms that are not end-user visible. If not present, returns both"),
  fallback_to_default: z.boolean().optional().describe("true returns the default ticket form when the criteria defined by the parameters results in a set without active and end-user visible ticket forms"),
  form_type: z.enum(["standard", "service_catalog", "all"]).optional().describe("Filter ticket forms by type. Use 'standard' for regular ticket forms, 'service_catalog' for service catalog forms, or 'all' to return all form types. Example: \"standard\""),
  associated_to_brand: z.boolean().optional().describe("true returns the ticket forms of the brand specified by the url's subdomain"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  locale: z.string().optional().describe("Locale to use for the ticket form names. If not specified, the default locale is used."),
})

export const ListTicketFormsOutput = z.object({
  ticket_forms: z.array(z.object({
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
  })).optional(),
})

export const listTicketForms = pikkuSessionlessFunc({
  description: "Returns a list of all ticket forms for your account if accessed as an admin or agent. End users only see ticket forms that have `end_user_visible` set to true.\n\n#### Allowed For\n\n* Anyone",
  input: ListTicketFormsInput,
  output: ListTicketFormsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_forms", data) as any
  },
})
