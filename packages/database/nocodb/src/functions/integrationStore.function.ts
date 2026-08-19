import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IntegrationStoreInput = z.object({
  integrationId: z.string(),
  body: z.union([z.object({
  op: z.literal("list").default("list"),
  limit: z.number(),
  offset: z.number(),
}), z.object({
  op: z.literal("get").default("get"),
}), z.object({
  op: z.literal("sum").default("sum"),
  fields: z.array(z.string()),
})]),
})

export const integrationStore = pikkuSessionlessFunc({
  description: "Store integration",
  input: IntegrationStoreInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/integrations/:integrationId/store", data)
  },
})
