import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BaseUserMetaUpdateInput = z.object({
  baseId: z.string(),
  starred: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Star Base"),
  order: z.number().optional().describe("The order among the bases"),
  hidden: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
})

export const baseUserMetaUpdate = pikkuSessionlessFunc({
  input: BaseUserMetaUpdateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/projects/{baseId}/user", data)
  },
})
