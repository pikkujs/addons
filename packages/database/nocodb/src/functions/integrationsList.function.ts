import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IntegrationsListOutput = z.record(z.string(), z.unknown())

export const integrationsList = pikkuSessionlessFunc({
  description: "List available integrations",
  output: IntegrationsListOutput,
  func: async ({ nocodb }) => {
    return nocodb.call("GET", "/api/v2/integrations") as any
  },
})
