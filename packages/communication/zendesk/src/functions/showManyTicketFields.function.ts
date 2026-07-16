import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowManyTicketFieldsInput = z.object({
  ids: z.string().optional().describe("Comma-separated list of ticket field IDs to retrieve. Up to 100 values accepted.\n\nEither `ids` or `keys` can be used, but not both.\n. Example: \"123,456,789\""),
  keys: z.string().optional().describe("Comma-separated list of ticket field keys to retrieve. Up to 100 values accepted.\n\nUse field keys like 'priority', 'status', 'subject' instead of numeric IDs.\n\nEither `ids` or `keys` can be used, but not both.\n. Example: \"priority,status,subject\""),
  creator: z.boolean().optional().describe("If true, includes creator information in the response.\n"),
  exclude_sub_selection_options: z.boolean().optional().describe("If true, excludes sub-selection options from dropdown fields in the response.\n"),
})

export const ShowManyTicketFieldsOutput = z.object({
  count: z.number().int().optional().describe("Total count when not using cursor pagination"),
  next_page: z.string().nullable().optional().describe("URL or cursor to the next page when paginated; null otherwise"),
  previous_page: z.string().nullable().optional().describe("URL or cursor to the previous page when paginated; null otherwise"),
  ticket_fields: z.array(z.object({
    active: z.boolean().optional().describe("Whether this field is available"),
    agent_can_edit: z.boolean().optional().describe("Whether this field is editable by agents"),
    agent_description: z.string().optional().describe("A description of the ticket field that only agents can see"),
    collapsed_for_agents: z.boolean().optional().describe("If true, the field is shown to agents by default. If false, the field is hidden alongside infrequently used fields. Classic interface only"),
    created_at: z.string().datetime().optional().describe("The time the custom ticket field was created"),
    creator_app_name: z.string().optional().describe("Name of the app that created the ticket field, or a null value if no app created the ticket field"),
    creator_user_id: z.number().int().optional().describe("The id of the user that created the ticket field, or a value of \"-1\" if an app created the ticket field"),
    custom_field_options: z.array(z.object({
      allow_solving: z.boolean().optional().describe("Whether selecting this option allows solving the ticket when the field is required to solve"),
      id: z.number().int().optional().describe("Automatically assigned upon creation"),
      name: z.string().describe("Name of the dropdown option"),
      position: z.number().int().optional().describe("Position of the dropdown option"),
      raw_name: z.string().optional().describe("Raw name of the dropdown option"),
      url: z.string().optional().describe("URL of the dropdown option"),
      value: z.string().describe("Value of the dropdown option"),
    })).optional().describe("Required and presented for a custom ticket field of type \"multiselect\" or \"tagger\""),
    custom_statuses: z.array(z.object({
      active: z.boolean().optional().describe("If true, if the custom status is set to active. If false, the custom status is set to inactive"),
      agent_label: z.string().optional().describe("The label displayed to agents"),
      created_at: z.string().datetime().optional().describe("The date and time at which the custom ticket status was created"),
      default: z.boolean().optional().describe("If true, the custom status is set to default. If false, the custom status is set to non-default"),
      description: z.string().optional().describe("The description of when the user should select this custom ticket status"),
      end_user_description: z.string().optional().describe("The description displayed to end users"),
      end_user_label: z.string().optional().describe("The label displayed to end users"),
      id: z.number().int().optional().describe("Automatically assigned when the custom ticket status is created"),
      status_category: z.enum(["new", "open", "pending", "hold", "solved"]).optional().describe("The status category the custom ticket status belongs to"),
      updated_at: z.string().datetime().optional().describe("The date and time at which the custom ticket status was last updated"),
    })).optional().describe("List of customized ticket statuses. Only presented for a system ticket field of type \"custom_status\""),
    description: z.string().optional().describe("Describes the purpose of the ticket field to users"),
    editable_in_portal: z.boolean().optional().describe("Whether this field is editable by end users in Help Center"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("The relative position of the ticket field on a ticket. Note that for accounts with ticket forms, positions are controlled by the different forms"),
    raw_description: z.string().optional().describe("The dynamic content placeholder if present, or the `description` value if not. See [Dynamic Content](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_title: z.string().optional().describe("The dynamic content placeholder if present, or the `title` value if not. See [Dynamic Content](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    raw_title_in_portal: z.string().optional().describe("The dynamic content placeholder if present, or the \"title_in_portal\" value if not. See [Dynamic Content](/api-reference/ticketing/ticket-management/dynamic_content/)"),
    regexp_for_validation: z.string().nullable().optional().describe("For \"regexp\" fields only. The validation pattern for a field value to be deemed valid"),
    relationship_filter: z.record(z.string(), z.unknown()).optional().describe("A filter definition that allows your autocomplete to filter down results"),
    relationship_target_type: z.string().optional().describe("A representation of what type of object the field references. Options are \"zen:user\", \"zen:organization\", \"zen:ticket\", or \"zen:custom_object:{key}\" where key is a custom object key. For example \"zen:custom_object:apartment\"."),
    removable: z.boolean().optional().describe("If false, this field is a system field that must be present on all tickets"),
    required: z.boolean().optional().describe("If true, agents must enter a value in the field to change the ticket status to solved"),
    required_in_portal: z.boolean().optional().describe("If true, end users must enter a value in the field to create the request"),
    sub_type_id: z.number().int().optional().describe("For system ticket fields of type \"priority\" and \"status\". Defaults to 0. A \"priority\" sub type of 1 removes the \"Low\" and \"Urgent\" options. A \"status\" sub type of 1 adds the \"On-Hold\" option"),
    system_field_options: z.array(z.object({
      name: z.string().optional().describe("Name of the system field option"),
      value: z.string().optional().describe("Value of the system field option"),
    })).optional().describe("Presented for a system ticket field of type \"tickettype\", \"priority\" or \"status\""),
    tag: z.string().nullable().optional().describe("For \"checkbox\" fields only. A tag added to tickets when the checkbox field is selected"),
    title: z.string().describe("The title of the ticket field"),
    title_in_portal: z.string().optional().describe("The title of the ticket field for end users in Help Center"),
    type: z.string().describe("System or custom field type. Editable for custom field types and only on creation. See [Create Ticket Field](#create-ticket-field)"),
    updated_at: z.string().datetime().optional().describe("The time the custom ticket field was last updated"),
    url: z.string().optional().describe("The URL for this resource"),
    visible_in_portal: z.boolean().optional().describe("Whether this field is visible to end users in Help Center"),
  })),
})

export const showManyTicketFields = pikkuSessionlessFunc({
  description: "Returns multiple ticket fields in a single request.\n\nProvide either:\n- `ids` — a comma-separated list of ticket field IDs, or\n- `keys` — a comma-separated list of ticket field keys\n\nUp to 100 values are accepted.\n\nThe response payload matches the List Ticket Fields [response format](/api-reference/ticketing/tickets/ticket_fields/#example-responses).\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name  | Will sideload                         |\n|-------|---------------------------------------|\n| users | The user or users that created fields |\n\n#### Allowed For\n\n* Anyone",
  input: ShowManyTicketFieldsInput,
  output: ShowManyTicketFieldsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_fields/show_many", data) as any
  },
})
