import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncidentDeleteInput = z.object({
  incidentId: z.string(),
})

export const IncidentDeleteOutput = z.record(z.string(), z.unknown())

export const incidentDelete = pikkuSessionlessFunc({
  description: "Delete an incident",
  input: IncidentDeleteInput,
  output: IncidentDeleteOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("DELETE", "/now/table/incident/{incidentId}", data) as any
  },
})
