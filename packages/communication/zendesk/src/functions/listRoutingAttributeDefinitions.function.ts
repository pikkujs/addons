import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListRoutingAttributeDefinitionsOutput = z.object({
  definitions: z.object({
    conditions_all: z.array(z.object({
      subject: z.string().optional(),
      title: z.string().optional(),
    })).optional(),
    conditions_any: z.array(z.object({
      subject: z.string().optional(),
      title: z.string().optional(),
    })).optional(),
  }).optional(),
})

export const listRoutingAttributeDefinitions = pikkuSessionlessFunc({
  description: "Returns the condition definitions that can be configured to apply attributes to a ticket.\n\n#### Allowed For\n\n* Admins",
  output: ListRoutingAttributeDefinitionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/routing/attributes/definitions") as any
  },
})
