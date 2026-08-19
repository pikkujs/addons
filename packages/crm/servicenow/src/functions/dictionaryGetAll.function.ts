import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DictionaryGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const DictionaryGetAllOutput = z.record(z.string(), z.unknown())

export const dictionaryGetAll = pikkuSessionlessFunc({
  description: "Get all dictionary records",
  input: DictionaryGetAllInput,
  output: DictionaryGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/sys_dictionary", data) as any
  },
})
