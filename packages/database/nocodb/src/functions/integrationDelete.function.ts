import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IntegrationDeleteInput = z.object({
  integrationId: z.string(),
})

export const integrationDelete = pikkuSessionlessFunc({
  description: "Delete integration",
  input: IntegrationDeleteInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v2/meta/integrations/{integrationId}", data)
  },
})
