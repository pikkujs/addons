import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageCreateInput = z.object({
  conversation_id: z.string().optional(),
  workspace_id: z.string().optional(),
  content: z.string().optional(),
})

export const MessageCreateOutput = z.record(z.string(), z.unknown())

export const messageCreate = pikkuSessionlessFunc({
  description: "Add a message to a conversation",
  input: MessageCreateInput,
  output: MessageCreateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/conversation_messages/add", data) as any
  },
})
