import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListOrganizationFieldsInput = z.object({
  page: z.object({
  after: z.string().optional().describe("Cursor token for fetching next page"),
  before: z.string().optional().describe("Cursor token for fetching previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
}).optional().describe("Cursor-based pagination parameters (JSON:API style).\n\nSupports nested parameters:\n- `page[size]` - Number of records per page (default varies by endpoint, typically 100)\n- `page[after]` - Cursor token to fetch records after this position\n- `page[before]` - Cursor token to fetch records before this position\n\nExample: `?page[size]=50&page[after]=eyJvIjoiaWQiLCJ2IjoiYVFFPSJ9`\n"),
  resolve_dc: z.boolean().optional().describe("If true, resolves dynamic content placeholders."),
})

export const ListOrganizationFieldsOutput = z.object({
  count: z.number().int().optional().describe("Total count of records retrieved"),
  next_page: z.string().nullable().optional().describe("URL of the next page"),
  organization_fields: z.array(z.object({
    active: z.boolean().optional().describe("If true, this field is available for use"),
    created_at: z.string().datetime().optional().describe("The time the field was created"),
    custom_field_options: z.array(z.object({
      allow_solving: z.boolean().optional().describe("Whether selecting this option allows solving the ticket when the field is required to solve"),
      id: z.number().int().optional().describe("Automatically assigned upon creation"),
      name: z.string().describe("Name of the dropdown option"),
      position: z.number().int().optional().describe("Position of the dropdown option"),
      raw_name: z.string().optional().describe("Raw name of the dropdown option"),
      url: z.string().optional().describe("URL of the dropdown option"),
      value: z.string().describe("Value of the dropdown option"),
    })).optional().describe("Required and presented for a custom field of type \"dropdown\". Each option is represented by an object with a `name` and `value` property"),
    description: z.string().optional().describe("User-defined description of this field's purpose"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    key: z.string().describe("A unique key that identifies this custom field. This is used for updating the field and referencing in placeholders. The key must consist of only letters, numbers, and underscores. It can't be only numbers"),
    position: z.number().int().optional().describe("Ordering of the field relative to other fields"),
    raw_description: z.string().optional().describe("The dynamic content placeholder, if present, or the `description` value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_title: z.string().optional().describe("The dynamic content placeholder, if present, or the `title` value, if not. See [Dynamic Content Items](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    regexp_for_validation: z.string().nullable().optional().describe("Regular expression field only. The validation pattern for a field value to be deemed valid"),
    relationship_filter: z.record(z.string(), z.unknown()).optional().describe("A filter definition that allows your autocomplete to filter down results"),
    system: z.boolean().optional().describe("If true, only active and position values of this field can be changed"),
    tag: z.string().optional().describe("Optional for custom field of type \"checkbox\"; not presented otherwise."),
    title: z.string().describe("The title of the custom field"),
    type: z.string().describe("The custom field type: \"checkbox\", \"currency\", \"date\", \"decimal\", \"dropdown\", \"integer\", [\"lookup\"](/api-reference/ticketing/lookup_relationships/lookup_relationships/), \"multiselect\", [\"parent\"](/api-reference/custom-data/custom-objects/custom_object_fields/#about-parent-relationship-fields) (custom objects only), \"regexp\", \"text\", or \"textarea\""),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the field"),
    url: z.string().optional().describe("The URL for this resource"),
    relationship_target_type: z.string().optional().describe("A representation of what type of object the field references. Options are \"zen:user\", \"zen:organization\", \"zen:ticket\", and \"zen:custom_object:{key}\" where key is a custom object key. For example \"zen:custom_object:apartment\"."),
  })).optional(),
  previous_page: z.string().nullable().optional().describe("URL of the previous page"),
})

export const listOrganizationFields = pikkuSessionlessFunc({
  description: "Returns a list of custom organization fields in your account. Fields are returned in the order that you specify in your organization fields configuration in Zendesk Support. Clients should cache this resource for the duration of their API usage and map the key for each organization field to the values returned under the `organization_fields` attribute on the [organization](/api-reference/ticketing/organizations/organizations/) resource.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListOrganizationFieldsInput,
  output: ListOrganizationFieldsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_fields", data) as any
  },
})
