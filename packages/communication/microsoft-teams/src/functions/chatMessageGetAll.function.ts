import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatMessageGetAllInput = z.object({
  chatId: z.string(),
})

export const ChatMessageGetAllOutput = z.record(z.string(), z.unknown())

export const chatMessageGetAll = pikkuSessionlessFunc({
  description: "Get many chat messages",
  input: ChatMessageGetAllInput,
  output: ChatMessageGetAllOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/chats/{chatId}/messages", data) as any
  },
})
