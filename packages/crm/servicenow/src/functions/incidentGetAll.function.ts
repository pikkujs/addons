import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IncidentGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const IncidentGetAllOutput = z.record(z.string(), z.unknown())

export const incidentGetAll = pikkuSessionlessFunc({
  description: "Get all incidents",
  input: IncidentGetAllInput,
  output: IncidentGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/incident", data) as any
  },
})
