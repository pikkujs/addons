import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminConversationsGetConversationPrefsInput = z.object({
  channel_id: z.string().describe("The channel to get preferences for."),
  token: z.string().describe("Authentication token. Requires scope: `admin.conversations:read`"),
})

export const AdminConversationsGetConversationPrefsOutput = z.object({
  ok: z.literal(true),
  prefs: z.object({
    can_thread: z.object({
      type: z.array(z.string()).optional(),
      user: z.array(z.string()).optional(),
    }).optional(),
    who_can_post: z.object({
      type: z.array(z.string()).optional(),
      user: z.array(z.string()).optional(),
    }).optional(),
  }).optional(),
}).describe("Schema for successful response of admin.conversations.getConversationPrefs")

export const adminConversationsGetConversationPrefs = pikkuSessionlessFunc({
  description: "Get conversation preferences for a public or private channel.",
  input: AdminConversationsGetConversationPrefsInput,
  output: AdminConversationsGetConversationPrefsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.conversations.getConversationPrefs", data) as any
  },
})
