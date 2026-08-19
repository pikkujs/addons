import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatScheduleMessageInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `chat:write`"),
  as_user: z.boolean().optional().describe("Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See [chat.postMessage](chat.postMessage#authorship)."),
  attachments: z.string().optional().describe("A JSON-based array of structured attachments, presented as a URL-encoded string."),
  blocks: z.string().optional().describe("A JSON-based array of structured blocks, presented as a URL-encoded string."),
  channel: z.string().optional().describe("Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name. See [below](#channels) for more details."),
  link_names: z.boolean().optional().describe("Find and link channel names and usernames."),
  parse: z.string().optional().describe("Change how messages are treated. Defaults to `none`. See [chat.postMessage](chat.postMessage#formatting)."),
  post_at: z.string().optional().describe("Unix EPOCH timestamp of time in future to send the message."),
  reply_broadcast: z.boolean().optional().describe("Used in conjunction with `thread_ts` and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to `false`."),
  text: z.string().optional().describe("How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail."),
  thread_ts: z.number().optional().describe("Provide another message's `ts` value to make this message a reply. Avoid using a reply's `ts` value; use its parent instead."),
  unfurl_links: z.boolean().optional().describe("Pass true to enable unfurling of primarily text-based content."),
  unfurl_media: z.boolean().optional().describe("Pass false to disable unfurling of media content."),
})

export const ChatScheduleMessageOutput = z.object({
  channel: z.string().regex(new RegExp("^[CGD][A-Z0-9]{8,}$")),
  message: z.object({
    bot_id: z.string().regex(new RegExp("^B[A-Z0-9]{8,}$")),
    bot_profile: z.object({
      app_id: z.string().regex(new RegExp("^A[A-Z0-9]{1,}$")),
      deleted: z.boolean(),
      icons: z.object({
        image_36: z.string().url(),
        image_48: z.string().url(),
        image_72: z.string().url(),
      }),
      id: z.string().regex(new RegExp("^B[A-Z0-9]{8,}$")),
      name: z.string(),
      team_id: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
      updated: z.number().int(),
    }).optional(),
    team: z.string().regex(new RegExp("^[T][A-Z0-9]{2,}$")),
    text: z.string(),
    type: z.string(),
    user: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")),
    username: z.string().optional(),
  }),
  ok: z.literal(true),
  post_at: z.number().int(),
  scheduled_message_id: z.string().regex(new RegExp("^[Q][A-Z0-9]{8,}$")),
}).describe("Schema for successful response of chat.scheduleMessage method")

export const chatScheduleMessage = pikkuSessionlessFunc({
  description: "Schedules a message to be sent to a channel.",
  input: ChatScheduleMessageInput,
  output: ChatScheduleMessageOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.scheduleMessage", data) as any
  },
})
