import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  channel: z.string().describe('Channel ID or name'),
  text: z.string().describe('Message text'),
  threadTs: z.string().optional().describe('Thread timestamp to reply to'),
  mrkdwn: z.boolean().optional().describe('Enable markdown formatting'),
  unfurlLinks: z.boolean().optional().describe('Enable link unfurling'),
  unfurlMedia: z.boolean().optional().describe('Enable media unfurling'),
})

const outputSchema = z.object({
  ok: z.boolean(),
  channel: z.string(),
  ts: z.string(),
  message: z.object({
    type: z.string(),
    subtype: z.string().optional(),
    text: z.string(),
    ts: z.string(),
    user: z.string().optional(),
    bot_id: z.string().optional(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const messagesSend = pikkuSessionlessFunc({
  description: 'Send a message to a Slack channel',
  node: { displayName: 'Send Message', category: 'Communication', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ slack }, data) => {
  return await slack.request('POST', 'chat.postMessage', {
    body: {
      channel: data.channel,
      text: data.text,
      thread_ts: data.threadTs,
      mrkdwn: data.mrkdwn,
      unfurl_links: data.unfurlLinks,
      unfurl_media: data.unfurlMedia,
    },
  }) as Output
  },
})
