import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SendEmailInput = z.object({
  from: z.string().describe('Sender email address (e.g. "Name <email@example.com>")'),
  to: z.union([z.string(), z.array(z.string())]).describe('Recipient email address(es)'),
  cc: z.union([z.string(), z.array(z.string())]).optional().describe('CC recipient(s)'),
  bcc: z.union([z.string(), z.array(z.string())]).optional().describe('BCC recipient(s)'),
  replyTo: z.string().optional().describe('Reply-to email address'),
  subject: z.string().describe('Email subject line'),
  text: z.string().optional().describe('Plain text body'),
  html: z.string().optional().describe('HTML body'),
})

export const SendEmailOutput = z.object({
  messageId: z.string().describe('Message ID assigned by the server'),
  accepted: z.array(z.string()).describe('Addresses that accepted the message'),
  rejected: z.array(z.string()).describe('Addresses that rejected the message'),
})

export const emailSend = pikkuSessionlessFunc({
  description: 'Send an email via SMTP',
  input: SendEmailInput,
  output: SendEmailOutput,
  node: { displayName: 'Send Email', category: 'Email', type: 'action' },
  func: async ({ emailTransport }, { from, to, cc, bcc, replyTo, subject, text, html }) => {
    const result = await emailTransport.sendMail({
      from,
      to,
      cc,
      bcc,
      replyTo,
      subject,
      text,
      html,
    })

    return {
      messageId: result.messageId,
      accepted: (result.accepted ?? []) as string[],
      rejected: (result.rejected ?? []) as string[],
    }
  },
})
