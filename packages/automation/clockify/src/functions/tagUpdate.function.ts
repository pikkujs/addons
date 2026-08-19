import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagUpdateInput = z.object({
  workspaceId: z.string(),
  tagId: z.string(),
  name: z.string().optional(),
})

export const TagUpdateOutput = z.record(z.string(), z.unknown())

export const tagUpdate = pikkuSessionlessFunc({
  description: "Update a tag",
  input: TagUpdateInput,
  output: TagUpdateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("PUT", "/workspaces/{workspaceId}/tags/{tagId}", data) as any
  },
})
