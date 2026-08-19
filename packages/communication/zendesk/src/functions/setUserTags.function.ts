import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetUserTagsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const SetUserTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const setUserTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: SetUserTagsInput,
  output: SetUserTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/users/{user_id}/tags", data) as any
  },
})
