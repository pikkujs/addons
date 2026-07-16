import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatMessageGetInput = z.object({
  chatId: z.string(),
  messageId: z.string(),
})

export const ChatMessageGetOutput = z.record(z.string(), z.unknown())

export const chatMessageGet = pikkuSessionlessFunc({
  description: "Get a chat message",
  input: ChatMessageGetInput,
  output: ChatMessageGetOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("GET", "/chats/{chatId}/messages/{messageId}", data) as any
  },
})
