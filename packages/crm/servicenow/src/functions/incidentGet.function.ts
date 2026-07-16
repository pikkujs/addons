import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IncidentGetInput = z.object({
  incidentId: z.string(),
  sysparm_fields: z.string().optional(),
})

export const IncidentGetOutput = z.record(z.string(), z.unknown())

export const incidentGet = pikkuSessionlessFunc({
  description: "Get an incident",
  input: IncidentGetInput,
  output: IncidentGetOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/incident/{incidentId}", data) as any
  },
})
