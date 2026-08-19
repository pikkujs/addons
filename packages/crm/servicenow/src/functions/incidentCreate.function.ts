import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncidentCreateInput = z.object({
  short_description: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  impact: z.number().int().optional(),
  urgency: z.number().int().optional(),
})

export const IncidentCreateOutput = z.record(z.string(), z.unknown())

export const incidentCreate = pikkuSessionlessFunc({
  description: "Create an incident",
  input: IncidentCreateInput,
  output: IncidentCreateOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("POST", "/now/table/incident", data) as any
  },
})
