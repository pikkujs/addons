import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import {
  MandrillRecipientSchema,
  MandrillSendResultSchema,
} from '../mandrill.types.js'

export const MessageSendInput = z.object({
  fromEmail: z.string().describe('Sender email address'),
  fromName: z.string().optional().describe('Sender name'),
  to: z.array(MandrillRecipientSchema).describe('Array of recipient objects'),
  subject: z.string().describe('Email subject'),
  html: z.string().describe('HTML content of the email'),
  text: z.string().optional().describe('Plain text content (auto-generated from HTML if not provided)'),
  tags: z.array(z.string()).optional().describe('Tags for categorizing the email'),
  trackOpens: z.boolean().optional().describe('Track email opens'),
  trackClicks: z.boolean().optional().describe('Track link clicks'),
  important: z.boolean().optional().describe('Mark as important'),
  async: z.boolean().optional().describe('Send asynchronously'),
  sendAt: z.string().optional().describe('UTC timestamp for scheduled delivery (YYYY-MM-DD HH:MM:SS)'),
})

export const MessageSendOutput = z.array(MandrillSendResultSchema)

type Output = z.infer<typeof MessageSendOutput>

export const mandrillMessageSend = pikkuSessionlessFunc({
  node: { displayName: 'Send Email', category: 'Messages', type: 'action' },
  input: MessageSendInput,
  output: MessageSendOutput,
  description: 'Send an email via Mandrill',
  func: async ({ mandrill }, data) => {
    return mandrill.sendMessage(
      {
        from_email: data.fromEmail,
        from_name: data.fromName,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        tags: data.tags,
        track_opens: data.trackOpens,
        track_clicks: data.trackClicks,
        important: data.important,
      },
      {
        async: data.async,
        send_at: data.sendAt,
      }
    )
  },
})
