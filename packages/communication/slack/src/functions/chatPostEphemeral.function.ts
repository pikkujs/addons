import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatPostEphemeralInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `chat:write`"),
  as_user: z.boolean().optional().describe("Pass true to post the message as the authed user. Defaults to true if the chat:write:bot scope is not included. Otherwise, defaults to false."),
  attachments: z.string().optional().describe("A JSON-based array of structured attachments, presented as a URL-encoded string."),
  blocks: z.string().optional().describe("A JSON-based array of structured blocks, presented as a URL-encoded string."),
  channel: z.string().describe("Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name."),
  icon_emoji: z.string().optional().describe("Emoji to use as the icon for this message. Overrides `icon_url`. Must be used in conjunction with `as_user` set to `false`, otherwise ignored. See [authorship](#authorship) below."),
  icon_url: z.string().optional().describe("URL to an image to use as the icon for this message. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below."),
  link_names: z.boolean().optional().describe("Find and link channel names and usernames."),
  parse: z.string().optional().describe("Change how messages are treated. Defaults to `none`. See [below](#formatting)."),
  text: z.string().optional().describe("How this field works and whether it is required depends on other fields you use in your API call. [See below](#text_usage) for more detail."),
  thread_ts: z.string().optional().describe("Provide another message's `ts` value to post this message in a thread. Avoid using a reply's `ts` value; use its parent's value instead. Ephemeral messages in threads are only shown if there is already an active thread."),
  user: z.string().describe("`id` of the user who will receive the ephemeral message. The user should be in the channel specified by the `channel` argument."),
  username: z.string().optional().describe("Set your bot's user name. Must be used in conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship) below."),
})

export const ChatPostEphemeralOutput = z.object({
  message_ts: z.string().regex(new RegExp("^\\d{10}\\.\\d{6}$")),
  ok: z.literal(true),
}).describe("Schema for successful response from chat.postEphemeral method")

export const chatPostEphemeral = pikkuSessionlessFunc({
  description: "Sends an ephemeral message to a user in a channel.",
  input: ChatPostEphemeralInput,
  output: ChatPostEphemeralOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.postEphemeral", data) as any
  },
})
