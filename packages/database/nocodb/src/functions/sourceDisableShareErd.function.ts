import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SourceDisableShareErdInput = z.object({
  baseId: z.string(),
  sourceId: z.string(),
})

export const sourceDisableShareErd = pikkuSessionlessFunc({
  input: SourceDisableShareErdInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/projects/{baseId}/bases/{sourceId}/share/erd", data)
  },
})
