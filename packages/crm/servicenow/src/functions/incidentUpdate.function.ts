import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncidentUpdateInput = z.object({
  incidentId: z.string(),
  short_description: z.string().optional(),
  state: z.string().optional(),
  category: z.string().optional(),
})

export const IncidentUpdateOutput = z.record(z.string(), z.unknown())

export const incidentUpdate = pikkuSessionlessFunc({
  description: "Update an incident",
  input: IncidentUpdateInput,
  output: IncidentUpdateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("PATCH", "/now/table/incident/{incidentId}", data) as any
  },
})
