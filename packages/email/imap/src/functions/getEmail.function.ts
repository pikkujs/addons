import { z } from 'zod'
import { simpleParser, type ParsedMail } from 'mailparser'
import { pikkuSessionlessFunc } from '#pikku'

export const GetEmailInput = z.object({
  mailbox: z.string().default('INBOX').describe('Mailbox containing the email'),
  uid: z.number().describe('Unique ID of the email'),
  markAsRead: z.boolean().default(false).describe('Mark the email as read after fetching'),
})

export const GetEmailOutput = z.object({
  uid: z.number(),
  from: z.string().optional(),
  to: z.string().optional(),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().optional(),
  date: z.string().optional(),
  messageId: z.string().optional(),
  inReplyTo: z.string().optional(),
  textPlain: z.string().optional(),
  textHtml: z.string().optional(),
  attachments: z.array(z.object({
    filename: z.string().optional(),
    contentType: z.string().optional(),
    size: z.number().optional(),
  })).optional(),
  flags: z.array(z.string()),
})

type GetEmailResult = z.infer<typeof GetEmailOutput>

export const getEmail = pikkuSessionlessFunc({
  description: 'Get a single email by its UID with full content and attachments info',
  node: { displayName: 'Get Email', category: 'Email', type: 'action' },
  input: GetEmailInput,
  output: GetEmailOutput,
  func: async ({ imap }, { mailbox = 'INBOX', uid, markAsRead = false }): Promise<GetEmailResult> => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(mailbox)

      try {
        const message = await client.fetchOne(uid, {
          source: true,
          flags: true,
        })

        if (!message || !message.source) {
          throw new Error(`Email with UID ${uid} not found`)
        }

        const parsed: ParsedMail = await simpleParser(message.source)

        if (markAsRead) {
          await client.messageFlagsAdd(uid, ['\\Seen'])
        }

        const result: GetEmailResult = {
          uid,
          flags: Array.from(message.flags || []),
        }

        if (parsed.from?.text) result.from = parsed.from.text
        if (parsed.to) result.to = Array.isArray(parsed.to) ? parsed.to.map((t: any) => t.text).join(', ') : parsed.to.text
        if (parsed.cc) result.cc = Array.isArray(parsed.cc) ? parsed.cc.map((t: any) => t.text).join(', ') : parsed.cc.text
        if (parsed.bcc) result.bcc = Array.isArray(parsed.bcc) ? parsed.bcc.map((t: any) => t.text).join(', ') : parsed.bcc.text
        if (parsed.subject) result.subject = parsed.subject
        if (parsed.date) result.date = parsed.date.toISOString()
        if (parsed.messageId) result.messageId = parsed.messageId
        if (parsed.inReplyTo) result.inReplyTo = parsed.inReplyTo

        if (parsed.text) result.textPlain = parsed.text
        if (parsed.html) result.textHtml = parsed.html as string

        if (parsed.attachments && parsed.attachments.length > 0) {
          result.attachments = parsed.attachments.map((att: any) => ({
            filename: att.filename,
            contentType: att.contentType,
            size: att.size,
          }))
        }

        return result
      } finally {
        lock.release()
      }
    })
  },
})
