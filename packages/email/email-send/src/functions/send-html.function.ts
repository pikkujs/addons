import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const AttachmentSchema = z.object({
  filename: z.string().describe('Attachment filename'),
  contentKey: z.string().describe('Content key for the attachment file'),
  contentType: z.string().optional().describe('MIME type of the attachment'),
})

export const SendHtmlEmailInput = z.object({
  from: z.string().describe('Sender email address'),
  to: z.union([z.string(), z.array(z.string())]).describe('Recipient email address(es)'),
  cc: z.union([z.string(), z.array(z.string())]).optional().describe('CC recipient(s)'),
  bcc: z.union([z.string(), z.array(z.string())]).optional().describe('BCC recipient(s)'),
  replyTo: z.string().optional().describe('Reply-to email address'),
  subject: z.string().describe('Email subject line'),
  html: z.string().describe('HTML body'),
  attachments: z.array(AttachmentSchema).optional().describe('File attachments'),
})

export const SendHtmlEmailOutput = z.object({
  messageId: z.string().describe('Message ID assigned by the server'),
  accepted: z.array(z.string()).describe('Addresses that accepted the message'),
  rejected: z.array(z.string()).describe('Addresses that rejected the message'),
})

export const emailSendHtml = pikkuSessionlessFunc({
  description: 'Send an HTML email with optional attachments via SMTP',
  input: SendHtmlEmailInput,
  output: SendHtmlEmailOutput,
  node: { displayName: 'Send HTML Email', category: 'Email', type: 'action' },
  func: async ({ emailTransport, content }, { from, to, cc, bcc, replyTo, subject, html, attachments }) => {
    const mailAttachments = attachments
      ? await Promise.all(
          attachments.map(async (att) => ({
            filename: att.filename,
            content: await content.readFileAsBuffer(att.contentKey),
            contentType: att.contentType,
          }))
        )
      : undefined

    const result = await emailTransport.sendMail({
      from,
      to,
      cc,
      bcc,
      replyTo,
      subject,
      html,
      attachments: mailAttachments,
    })

    return {
      messageId: result.messageId,
      accepted: (result.accepted ?? []) as string[],
      rejected: (result.rejected ?? []) as string[],
    }
  },
})
