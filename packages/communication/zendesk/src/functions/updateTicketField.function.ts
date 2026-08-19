import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateTicketFieldInput = z.object({
  ticket_field_id: z.number().int().describe("The ID of the ticket field. Example: 34"),
  creator: z.boolean().optional().describe("If true, displays the `creator_user_id` and `creator_app_name` properties. If the ticket field is created\n by an app, `creator_app_name` is the name of the app and `creator_user_id` is `-1`. If the ticket field\n is not created by an app, then `creator_app_name` is null\n"),
})

export const UpdateTicketFieldOutput = z.object({
  ticket_field: z.object({
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
  }).optional(),
})

export const updateTicketField = pikkuSessionlessFunc({
  description: "#### Updating drop-down field options\n\nYou can also use the update endpoint to add, update, or remove options in a drop-down custom field. Updating field options for multi-select fields works exactly the same as drop-down field options.\n\n**Important**: Unless you want to remove some options, you must specify all existing options in any update request. Omitting an option removes it from the drop-down field, which removes its values from any tickets or macros.\n\nUse the `custom_field_options` attribute to update the options. The attribute consists of an array of option objects, with each object consisting of a `name`, `value` and `allow_solving` property. The properties correspond to the \"Title\", \"Tag\" and \"Required to solve\" boxes in the admin interface. Example request body:\n\n```json\n{\"ticket_field\": {\n    \"custom_field_options\": [\n      {\"name\": \"Apple Pie\", \"value\": \"apple\", \"allow_solving\": true},\n      {\"name\": \"Pecan Pie\", \"value\": \"pecan\", \"allow_solving\": false}\n    ]\n  }\n}\n```\n\n#### Example Request\n\n```bash\ncurl https://{subdomain}.zendesk.com/api/v2/ticket_fields/{id} \\\n  -d '{\"ticket_field\": {\"custom_field_options\": [{\"name\": \"Apple Pie\", \"value\": \"apple\", \"allow_solving\": true}, {\"name\": \"Pecan Pie\", \"value\": \"pecan\", \"allow_solving\": false}]}}' \\\n  -H \"Content-Type: application/json\" -X PUT \\\n  -v -u {email_address}/token:{api_token}\n```\n\n#### Example Response\n\n```http\nStatus: 200 OK\n\n{\n  \"ticket_field\": {\n    \"id\":21938362,\n    \"type\":\"tagger\",\n    \"title\":\"Pies\",\n    ...\n    \"custom_field_options\": [\n      {\n        \"id\":21029772,\n        \"name\":\"Apple Pie\",\n        \"raw_name\":\"Apple Pie\",\n        \"value\":\"apple\",\n        \"default\":false,\n        \"allow_solving\":true\n      },\n      ...\n    ]\n  }\n}\n```\n\n#### Allowed for\n\n* Admins",
  input: UpdateTicketFieldInput,
  output: UpdateTicketFieldOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/ticket_fields/{ticket_field_id}", data) as any
  },
})
