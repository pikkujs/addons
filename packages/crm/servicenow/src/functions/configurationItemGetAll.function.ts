import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConfigurationItemGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const ConfigurationItemGetAllOutput = z.record(z.string(), z.unknown())

export const configurationItemGetAll = pikkuSessionlessFunc({
  description: "Get all configuration items",
  input: ConfigurationItemGetAllInput,
  output: ConfigurationItemGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/cmdb_ci", data) as any
  },
})
