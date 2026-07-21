import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowOrganizationFieldInput = z.object({
  organization_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the organization field. Example: \"my_text_field\""),
})

export const ShowOrganizationFieldOutput = z.object({
  organization_field: z.object({
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
  }).optional(),
})

export const showOrganizationField = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Agents",
  input: ShowOrganizationFieldInput,
  output: ShowOrganizationFieldOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_fields/{organization_field_id}", data) as any
  },
})
