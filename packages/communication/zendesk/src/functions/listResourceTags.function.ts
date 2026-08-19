import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListResourceTagsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ListResourceTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const listResourceTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ListResourceTagsInput,
  output: ListResourceTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/tags", data) as any
  },
})
