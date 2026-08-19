import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListObjectTriggersDefinitionsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const ListObjectTriggersDefinitionsOutput = z.object({
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
        format: z.string().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    })).optional(),
    conditions_all: z.array(z.object({
      group: z.string().optional(),
      nullable: z.boolean().optional(),
      operators: z.array(z.object({
        format: z.string().optional(),
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
        format: z.string().optional(),
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

export const listObjectTriggersDefinitions = pikkuSessionlessFunc({
  description: "Lists the conditions and actions of all triggers for the specified custom object.\n\n#### Allowed For \n* Agents",
  input: ListObjectTriggersDefinitionsInput,
  output: ListObjectTriggersDefinitionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/triggers/definitions", data) as any
  },
})
