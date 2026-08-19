import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsSetConversationPrefsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:write`"),
  channel_id: z.string().describe("The channel to set the prefs for"),
  prefs: z.string().describe("The prefs for this channel in a stringified JSON format."),
})

export const AdminConversationsSetConversationPrefsOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response of admin.conversations.setConversationPrefs")

export const adminConversationsSetConversationPrefs = pikkuSessionlessFunc({
  description: "Set the posting permissions for a public or private channel.",
  input: AdminConversationsSetConversationPrefsInput,
  output: AdminConversationsSetConversationPrefsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.conversations.setConversationPrefs", data) as any
  },
})
