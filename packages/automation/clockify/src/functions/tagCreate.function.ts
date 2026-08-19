import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TagCreateInput = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
})

export const TagCreateOutput = z.record(z.string(), z.unknown())

export const tagCreate = pikkuSessionlessFunc({
  description: "Create a tag",
  input: TagCreateInput,
  output: TagCreateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("POST", "/workspaces/{workspaceId}/tags", data) as any
  },
})
