import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatMessageCreateInput = z.object({
  chatId: z.string(),
  content: z.string().optional(),
  contentType: z.string().optional(),
})

export const ChatMessageCreateOutput = z.record(z.string(), z.unknown())

export const chatMessageCreate = pikkuSessionlessFunc({
  description: "Create a chat message",
  input: ChatMessageCreateInput,
  output: ChatMessageCreateOutput,
  func: async ({ microsoftTeams }, data) => {
    return microsoftTeams.call("POST", "/chats/{chatId}/messages", data) as any
  },
})
