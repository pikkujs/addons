import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsInviteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("The ID of the public or private channel to invite user(s) to."),
  users: z.string().optional().describe("A comma separated list of user IDs. Up to 1000 users may be listed."),
})

export const ConversationsInviteOutput = z.object({
  channel: z.unknown(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.invite method")

export const conversationsInvite = pikkuSessionlessFunc({
  description: "Invites users to a channel.",
  input: ConversationsInviteInput,
  output: ConversationsInviteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.invite", data) as any
  },
})
