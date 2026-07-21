import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetRelationshipFilterDefinitionsInput = z.object({
  target_type: z.string().describe("The target type for which you would like to see filter definitions.\nThe options are \"zen:user\", \"zen:ticket\", \"zen:organization\", and \"zen:custom_object:CUSTOM_OBJECT_KEY\"\n. Example: \"zen:custom_object:apartment\""),
  source_type: z.string().optional().describe("The source type for which you would like to see filter definitions.\nThe options are \"zen:user\", \"zen:ticket\", and \"zen:organization\"\n. Example: \"zen:user\""),
})

export const GetRelationshipFilterDefinitionsOutput = z.object({
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
    })).optional(),
  }).optional(),
})

export const getRelationshipFilterDefinitions = pikkuSessionlessFunc({
  description: "Returns filter definitions based on the given target type.  Target types\ninclude users (zen:user), tickets (zen:ticket), organizations (zen:organization), or custom objects (zen:custom_object:CUSTOM_OBJECT_KEY).\nThe returned filter definitions are the options that you can use to build a custom field or ticket field's\n`relationship_filter`.",
  input: GetRelationshipFilterDefinitionsInput,
  output: GetRelationshipFilterDefinitionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/relationships/definitions/{target_type}", data) as any
  },
})
