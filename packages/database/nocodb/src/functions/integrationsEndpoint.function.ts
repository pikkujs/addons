import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IntegrationsEndpointInput = z.object({
  integrationId: z.string(),
  endpoint: z.string(),
  body: z.record(z.string(), z.unknown()),
})

export const IntegrationsEndpointOutput = z.record(z.string(), z.unknown())

export const integrationsEndpoint = pikkuSessionlessFunc({
  description: "Call exposed integration endpoint",
  input: IntegrationsEndpointInput,
  output: IntegrationsEndpointOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/integrations/:integrationId/:endpoint", data) as any
  },
})
