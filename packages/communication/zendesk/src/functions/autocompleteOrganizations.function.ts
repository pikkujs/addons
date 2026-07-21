import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, TooManyRequestsError } from '@pikku/core/errors'

export const AutocompleteOrganizationsInput = z.object({
  name: z.string().describe("A substring of an organization to search for. Example: \"imp\""),
  field_id: z.string().optional().describe("The id of a lookup relationship field.  The type of field is determined\nby the `source` param\n"),
  source: z.string().optional().describe("If a `field_id` is provided, this specifies the type of the field.\nFor example, if the field is on a \"zen:user\", it references a field on a user\n"),
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
})

export const AutocompleteOrganizationsOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  organizations: z.array(z.object({
    created_at: z.string().optional().describe("The time the organization was created"),
    details: z.string().nullable().optional().describe("Any details obout the organization, such as the address"),
    domain_names: z.array(z.string()).optional().describe("An array of domain names associated with this organization"),
    external_id: z.string().nullable().optional().describe("A unique external id to associate organizations to an external record. The id is case-insensitive. For example, \"company1\" and \"Company1\" are considered the same"),
    group_id: z.number().int().nullable().optional().describe("New tickets from users in this organization are automatically put in this group"),
    id: z.number().int().optional().describe("Automatically assigned when the organization is created"),
    name: z.string().describe("A unique name for the organization"),
    notes: z.string().nullable().optional().describe("Any notes you have about the organization"),
    organization_fields: z.record(z.string(), z.union([z.string(), z.number()])).nullable().optional().describe("Custom fields for this organization. See [Custom organization fields](/api-reference/ticketing/organizations/organizations/#custom-organization-fields)"),
    shared_comments: z.boolean().optional().describe("End users in this organization are able to comment on each other's tickets"),
    shared_tickets: z.boolean().optional().describe("End users in this organization are able to see each other's tickets"),
    tags: z.array(z.string()).optional().describe("The tags of the organization"),
    updated_at: z.string().optional().describe("The time of the last update of the organization"),
    url: z.string().optional().describe("The API url of this organization"),
  })).optional(),
  previous_page: z.string().nullable().optional(),
})

export const autocompleteOrganizations = pikkuSessionlessFunc({
  description: "Returns an array of organizations whose name starts with the\nvalue specified in the `name` parameter.\n\n#### Pagination\n\n* Offset pagination only\n\nSee [Using Offset Pagination](/api-reference/introduction/pagination/#using-offset-pagination).\n\n#### Allowed For\n\n* Agents",
  input: AutocompleteOrganizationsInput,
  output: AutocompleteOrganizationsOutput,
  errors: [BadRequestError, TooManyRequestsError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/autocomplete", data) as any
  },
})
