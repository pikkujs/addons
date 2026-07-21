import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUserFieldOptionsInput = z.object({
  user_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the user field. Example: \"my_text_field\""),
})

export const ListUserFieldOptionsOutput = z.object({
  count: z.number().int().optional().describe("Total count of records retrieved"),
  custom_field_options: z.array(z.object({
    allow_solving: z.boolean().optional().describe("Whether selecting this option allows solving the ticket when the field is required to solve"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Name of the dropdown option"),
    position: z.number().int().optional().describe("Position of the dropdown option"),
    raw_name: z.string().optional().describe("Raw name of the dropdown option"),
    url: z.string().optional().describe("URL of the dropdown option"),
    value: z.string().describe("Value of the dropdown option"),
  })).optional(),
  next_page: z.string().nullable().optional().describe("URL of the next page"),
  previous_page: z.string().nullable().optional().describe("URL of the previous page"),
})

export const listUserFieldOptions = pikkuSessionlessFunc({
  description: "Returns a list of custom user field options for the given dropdown user field.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListUserFieldOptionsInput,
  output: ListUserFieldOptionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/user_fields/{user_field_id}/options", data) as any
  },
})
