import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TagGetAllInput = z.object({
  workspaceId: z.string(),
  "page-size": z.number().int().optional(),
})

export const TagGetAllOutput = z.record(z.string(), z.unknown())

export const tagGetAll = pikkuSessionlessFunc({
  description: "Get all tags",
  input: TagGetAllInput,
  output: TagGetAllOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/tags", data) as any
  },
})
