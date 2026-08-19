import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DmMessagesInput = z.object({
  roomId: z.string(),
  count: z.number().optional(),
})

export const DmMessagesOutput = z.object({
  success: z.boolean().optional(),
})

export const dmMessages = pikkuSessionlessFunc({
  description: "Retrieve a list of direct messages",
  input: DmMessagesInput,
  output: DmMessagesOutput,
  func: async ({ rocketchat }, data) => {
    return rocketchat.call("GET", "/dm.messages", data) as any
  },
})
