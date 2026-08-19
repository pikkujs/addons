import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DirectMessageCreateInput = z.object({
  participantId: z.string(),
  text: z.string().optional(),
})

export const DirectMessageCreateOutput = z.record(z.string(), z.unknown())

export const directMessageCreate = pikkuSessionlessFunc({
  description: "Send a direct message",
  input: DirectMessageCreateInput,
  output: DirectMessageCreateOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("POST", "/dm_conversations/with/{participantId}/messages", data) as any
  },
})
