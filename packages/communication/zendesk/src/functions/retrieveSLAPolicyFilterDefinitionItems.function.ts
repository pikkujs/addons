import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const RetrieveSLAPolicyFilterDefinitionItemsOutput = z.object({
  definitions: z.object({
    all: z.array(z.object({
      group: z.string().optional(),
      operators: z.array(z.object({
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      target: z.string().nullable().optional(),
      title: z.string().optional(),
      value: z.string().optional(),
      values: z.object({
        list: z.array(z.object({
          title: z.string().optional(),
          value: z.string().nullable().optional(),
        })).optional(),
        type: z.string().optional(),
      }).optional(),
    })).optional(),
    any: z.array(z.object({
      group: z.string().optional(),
      operators: z.array(z.object({
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      target: z.string().nullable().optional(),
      title: z.string().optional(),
      value: z.string().optional(),
      values: z.object({
        list: z.array(z.object({
          title: z.string().optional(),
          value: z.string().nullable().optional(),
        })).optional(),
        type: z.string().optional(),
      }).optional(),
    })).optional(),
  }).optional(),
})

export const retrieveSLAPolicyFilterDefinitionItems = pikkuSessionlessFunc({
  description: "#### Availability\n\n* Accounts on the Support Professional or Suite Growth plan or above\n\n#### Allowed For\n\n* Admins",
  output: RetrieveSLAPolicyFilterDefinitionItemsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/slas/policies/definitions") as any
  },
})
