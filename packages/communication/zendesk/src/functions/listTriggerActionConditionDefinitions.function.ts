import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTriggerActionConditionDefinitionsOutput = z.object({
  definitions: z.object({
    actions: z.array(z.object({
      group: z.string().optional(),
      nullable: z.boolean().optional(),
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
    })).optional(),
  }).optional(),
})

export const listTriggerActionConditionDefinitions = pikkuSessionlessFunc({
  description: "Returns the definitions of the actions a ticket trigger can perform and the\ndefinitions of the conditions under which a ticket trigger can execute. The\ndefinition of the action includes a title (\"Status\"), a type (\"list\"), and\npossible values. The definition of the condition includes the same fields\nas well as the possible operators.\n\nFor a list of supported actions, see the [Actions reference](/documentation/ticketing/reference-guides/actions-reference)\nFor a list of supported conditions, see the [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)\n\n#### Allowed For\n\n* Agents",
  output: ListTriggerActionConditionDefinitionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/triggers/definitions") as any
  },
})
