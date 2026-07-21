import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BusinessServiceGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const BusinessServiceGetAllOutput = z.record(z.string(), z.unknown())

export const businessServiceGetAll = pikkuSessionlessFunc({
  description: "Get all business services",
  input: BusinessServiceGetAllInput,
  output: BusinessServiceGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/cmdb_ci_service", data) as any
  },
})
