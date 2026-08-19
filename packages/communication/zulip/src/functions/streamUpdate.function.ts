import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const StreamUpdateInput = z.object({
  streamId: z.string(),
  description: z.string().optional(),
  new_name: z.string().optional(),
})

export const StreamUpdateOutput = z.record(z.string(), z.unknown())

export const streamUpdate = pikkuSessionlessFunc({
  description: "Update a stream",
  input: StreamUpdateInput,
  output: StreamUpdateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("PATCH", "/streams/{streamId}", data) as any
  },
})
