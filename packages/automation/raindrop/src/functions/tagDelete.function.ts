import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TagDeleteInput = z.object({
  tags: z.array(z.string()).optional(),
})

export const TagDeleteOutput = z.record(z.string(), z.unknown())

export const tagDelete = pikkuSessionlessFunc({
  description: "Delete tags",
  input: TagDeleteInput,
  output: TagDeleteOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("DELETE", "/tags", data) as any
  },
})
