import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatPostMessageInput = z.object({
  channel: z.string().optional(),
  text: z.string().optional(),
  alias: z.string().optional(),
  emoji: z.string().optional(),
  avatar: z.string().optional(),
})

export const ChatPostMessageOutput = z.object({
  success: z.boolean().optional(),
})

export const chatPostMessage = pikkuSessionlessFunc({
  description: "Post a message to a channel or direct message",
  input: ChatPostMessageInput,
  output: ChatPostMessageOutput,
  func: async ({ rocketchat }, data) => {
    return rocketchat.call("POST", "/chat.postMessage", data) as any
  },
})
