import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatMessageSendAndWaitInput = z.object({
  chatId: z.string(),
  message: z.string().optional(),
  subject: z.string().optional(),
})

export const ChatMessageSendAndWaitOutput = z.record(z.string(), z.unknown())

export const chatMessageSendAndWait = pikkuSessionlessFunc({
  description: "Send a chat message and wait for response",
  input: ChatMessageSendAndWaitInput,
  output: ChatMessageSendAndWaitOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("POST", "/chats/{chatId}/sendAndWait", data) as any
  },
})
