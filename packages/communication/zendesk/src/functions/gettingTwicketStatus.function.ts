import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GettingTwicketStatusInput = z.object({
  comment_id: z.number().int().describe("The ID of the comment. Example: 654321"),
  ids: z.string().optional().describe("Optional comment ids to retrieve tweet information for only particular comments. Example: \"1,3,5\""),
})

export const GettingTwicketStatusOutput = z.object({
  statuses: z.array(z.object({
    favorited: z.boolean().optional(),
    id: z.number().int().optional(),
    retweeted: z.boolean().optional(),
    user_followed: z.boolean().optional(),
  })).optional(),
})

export const gettingTwicketStatus = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: GettingTwicketStatusInput,
  output: GettingTwicketStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/channels/twitter/tickets/{comment_id}/statuses", data) as any
  },
})
