import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsSetTopicInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Conversation to set the topic of"),
  topic: z.string().optional().describe("The new topic string. Does not support formatting or linkification."),
})

export const ConversationsSetTopicOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.setTopic method")

export const conversationsSetTopic = pikkuSessionlessFunc({
  description: "Sets the topic for a conversation.",
  input: ConversationsSetTopicInput,
  output: ConversationsSetTopicOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.setTopic", data) as any
  },
})
