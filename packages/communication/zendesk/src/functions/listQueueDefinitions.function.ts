import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListQueueDefinitionsOutput = z.object({
  definitions: z.object({
    conditions_all: z.array(z.object({
      group: z.string().optional(),
      nullable: z.boolean().optional(),
      operators: z.array(z.object({
        terminal: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      repeatable: z.boolean().optional(),
      subject: z.string().optional(),
      title: z.string().optional(),
      type: z.string().optional(),
      values: z.array(z.object({
        enabled: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    })).optional(),
    conditions_any: z.array(z.object({
      group: z.string().optional(),
      nullable: z.boolean().optional(),
      operators: z.array(z.object({
        terminal: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      repeatable: z.boolean().optional(),
      subject: z.string().optional(),
      title: z.string().optional(),
      type: z.string().optional(),
      values: z.array(z.object({
        enabled: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    })).optional(),
  }).optional(),
})

export const listQueueDefinitions = pikkuSessionlessFunc({
  description: "Returns the definitions of the queues and the\ndefinitions of the conditions under which a queue can execute. The\ndefinition of the action includes a title (\"Status\"), a type (\"list\"), and\npossible values. The definition of the condition includes the same fields\nas well as the possible operators.\n#### Allowed For\n\n* Admins",
  output: ListQueueDefinitionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/queues/definitions") as any
  },
})
