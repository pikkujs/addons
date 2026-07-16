import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowUserFieldOptionInput = z.object({
  user_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the user field. Example: \"my_text_field\""),
  user_field_option_id: z.number().int().describe("The ID of the user field option. Example: 10001"),
})

export const ShowUserFieldOptionOutput = z.object({
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

export const showUserFieldOption = pikkuSessionlessFunc({
  description: "#### Allowed for\n* Agents",
  input: ShowUserFieldOptionInput,
  output: ShowUserFieldOptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/user_fields/{user_field_id}/options/{user_field_option_id}", data) as any
  },
})
