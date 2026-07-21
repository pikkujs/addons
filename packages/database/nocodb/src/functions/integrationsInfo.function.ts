import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IntegrationsInfoInput = z.object({
  type: z.string(),
  subType: z.string(),
})

export const IntegrationsInfoOutput = z.record(z.string(), z.unknown())

export const integrationsInfo = pikkuSessionlessFunc({
  description: "Get info for integration",
  input: IntegrationsInfoInput,
  output: IntegrationsInfoOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/integrations/:type/:subType", data) as any
  },
})
