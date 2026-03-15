import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessagesSendInput = z.object({
  from: z.string().describe('Sender email address (e.g., "Admin <admin@example.com>")'),
  to: z.string().describe('Recipient email address(es), comma-separated'),
  cc: z.string().optional().describe('CC email address(es), comma-separated'),
  bcc: z.string().optional().describe('BCC email address(es), comma-separated'),
  subject: z.string().describe('Email subject'),
  text: z.string().optional().describe('Plain text body'),
  html: z.string().optional().describe('HTML body'),
})

export const MessagesSendOutput = z.object({
  id: z.string(),
  message: z.string(),
})

type Output = z.infer<typeof MessagesSendOutput>

export const messagesSend = pikkuSessionlessFunc({
  description: 'Send an email via Mailgun',
  node: { displayName: 'Send Email', category: 'Messages', type: 'action' },
  input: MessagesSendInput,
  output: MessagesSendOutput,
  func: async ({ mailgun }, data) => {
  return mailgun.sendEmail(data)
  },
})
