import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTargetsOutput = z.object({
  targets: z.array(z.object({
    active: z.boolean().optional().describe("Whether or not the target is activated"),
    created_at: z.string().datetime().optional().describe("The time the target was created"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    title: z.string().describe("A name for the target"),
    type: z.string().describe("A pre-defined target, such as \"basecamp_target\". See the additional attributes for the type that follow"),
  })).optional(),
})

export const listTargets = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  output: ListTargetsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/targets") as any
  },
})
