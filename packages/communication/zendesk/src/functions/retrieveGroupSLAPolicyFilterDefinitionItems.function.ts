import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RetrieveGroupSLAPolicyFilterDefinitionItemsOutput = z.object({
  definitions: z.object({
    all: z.array(z.object({
      group: z.string().optional(),
      operators: z.array(z.object({
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      title: z.string().optional(),
      value: z.string().optional(),
      values: z.object({
        list: z.array(z.object({
          title: z.string().optional(),
          value: z.number().int().nullable().optional(),
        })).optional(),
        type: z.string().optional(),
      }).optional(),
    })).optional(),
  }).optional(),
})

export const retrieveGroupSLAPolicyFilterDefinitionItems = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  output: RetrieveGroupSLAPolicyFilterDefinitionItemsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/group_slas/policies/definitions") as any
  },
})
