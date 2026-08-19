import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsOpenInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:write`"),
  channel: z.string().optional().describe("Resume a conversation by supplying an `im` or `mpim`'s ID. Or provide the `users` field instead."),
  return_im: z.boolean().optional().describe("Boolean, indicates you want the full IM channel definition in the response."),
  users: z.string().optional().describe("Comma separated lists of users. If only one user is included, this creates a 1:1 DM.  The ordering of the users is preserved whenever a multi-person direct message is returned. Supply a `channel` when not supplying `users`."),
})

export const ConversationsOpenOutput = z.object({
  already_open: z.boolean().optional(),
  channel: z.unknown(),
  no_op: z.boolean().optional(),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.open method when opening channels, ims, mpims")

export const conversationsOpen = pikkuSessionlessFunc({
  description: "Opens or resumes a direct message or multi-person direct message.",
  input: ConversationsOpenInput,
  output: ConversationsOpenOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/conversations.open", data) as any
  },
})
