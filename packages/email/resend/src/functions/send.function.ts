import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const Recipients = z.union([z.string(), z.array(z.string())])

export const ResendSendInput = z.object({
  from: z.string().describe('Sender email address (e.g. "Acme <onboarding@resend.dev>")'),
  to: Recipients.describe('Recipient email address(es)'),
  cc: Recipients.optional().describe('CC recipient(s)'),
  bcc: Recipients.optional().describe('BCC recipient(s)'),
  replyTo: Recipients.optional().describe('Reply-to address(es)'),
  subject: z.string().describe('Email subject line'),
  text: z.string().optional().describe('Plain text body'),
  html: z.string().optional().describe('HTML body'),
  headers: z.record(z.string(), z.string()).optional().describe('Custom email headers'),
})

export const ResendSendOutput = z.object({
  id: z.string().describe('The id of the sent email'),
})

export const resendSend = pikkuSessionlessFunc({
  description: 'Send an email via Resend',
  node: { displayName: 'Send Email', category: 'Email', type: 'action' },
  input: ResendSendInput,
  output: ResendSendOutput,
  func: async ({ resend }, { from, to, cc, bcc, replyTo, subject, text, html, headers }) => {
    return resend.sendEmail({
      from,
      to,
      cc,
      bcc,
      reply_to: replyTo,
      subject,
      text,
      html,
      headers,
    })
  },
})
