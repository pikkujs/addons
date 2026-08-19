import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagDeleteInput = z.object({
  workspaceId: z.string(),
  tagId: z.string(),
})

export const TagDeleteOutput = z.record(z.string(), z.unknown())

export const tagDelete = pikkuSessionlessFunc({
  description: "Delete a tag",
  input: TagDeleteInput,
  output: TagDeleteOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("DELETE", "/workspaces/{workspaceId}/tags/{tagId}", data) as any
  },
})
