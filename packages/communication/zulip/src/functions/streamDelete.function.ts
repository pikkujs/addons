import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StreamDeleteInput = z.object({
  streamId: z.string(),
})

export const StreamDeleteOutput = z.record(z.string(), z.unknown())

export const streamDelete = pikkuSessionlessFunc({
  description: "Delete a stream",
  input: StreamDeleteInput,
  output: StreamDeleteOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("DELETE", "/streams/{streamId}", data) as any
  },
})
