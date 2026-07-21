import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateOrUpdateUserFieldOptionInput = z.object({
  user_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the user field. Example: \"my_text_field\""),
})

export const CreateOrUpdateUserFieldOptionOutput = z.object({
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

export const createOrUpdateUserFieldOption = pikkuSessionlessFunc({
  description: "Creates a new option or updates an existing option for the given drop-down user field.\n\nTo update an option, include the id of the option in the `custom_field_option` object. Example: `{\"custom_field_option\": {\"id\": 10002, \"name\": \"Pineapples\", ... }`. If an option exists for the given ID, the option will be updated. Otherwise, a new option will be created.\n\n#### Response\n\nReturns one of the following status codes:\n\n- 200 with `Location: /api/v2/user_fields/{user_field_id}/options` if the user field option already exists in the database\n- 201 with `Location: /api/v2/user_fields/{user_field_id}/options` if the user field option is new\n\n#### Allowed For\n\n* Admins",
  input: CreateOrUpdateUserFieldOptionInput,
  output: CreateOrUpdateUserFieldOptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/user_fields/{user_field_id}/options", data) as any
  },
})
