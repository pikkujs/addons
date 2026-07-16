import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PutUserTagsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const PutUserTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const putUserTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: PutUserTagsInput,
  output: PutUserTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/tags", data) as any
  },
})
