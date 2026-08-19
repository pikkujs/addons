import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListUserTagsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ListUserTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const listUserTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ListUserTagsInput,
  output: ListUserTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/tags", data) as any
  },
})
