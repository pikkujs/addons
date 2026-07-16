import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatUnfurlInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `links:write`"),
  channel: z.string().describe("Channel ID of the message"),
  ts: z.string().describe("Timestamp of the message to add unfurl behavior to."),
  unfurls: z.string().optional().describe("URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl blocks or message attachments."),
  user_auth_message: z.string().optional().describe("Provide a simply-formatted string to send as an ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior"),
  user_auth_required: z.boolean().optional().describe("Set to `true` or `1` to indicate the user must install your Slack app to trigger unfurls for this domain"),
  user_auth_url: z.string().optional().describe("Send users to this custom URL where they will complete authentication in your app to fully trigger unfurling. Value should be properly URL-encoded."),
})

export const ChatUnfurlOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from chat.unfurl method")

export const chatUnfurl = pikkuSessionlessFunc({
  description: "Provide custom unfurl behavior for user-posted URLs",
  input: ChatUnfurlInput,
  output: ChatUnfurlOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.unfurl", data) as any
  },
})
