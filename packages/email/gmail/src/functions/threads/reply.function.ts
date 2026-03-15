import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailAddressSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
})

export const ThreadReplyInput = z.object({
  threadId: z.string(),
  to: z.array(EmailAddressSchema),
  cc: z.array(EmailAddressSchema).optional(),
  bcc: z.array(EmailAddressSchema).optional(),
  subject: z.string().optional(),
  body: z.string(),
  isHtml: z.boolean().optional().default(false),
})

export const ThreadReplyOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
})

function formatAddress(addr: { name?: string; email: string }): string {
  return addr.name ? `${addr.name} <${addr.email}>` : addr.email
}

function createReplyMessage(
  input: z.infer<typeof ThreadReplyInput>,
  originalHeaders: { messageId?: string; subject?: string }
): string {
  const lines: string[] = []

  lines.push(`To: ${input.to.map(formatAddress).join(', ')}`)

  if (input.cc?.length) {
    lines.push(`Cc: ${input.cc.map(formatAddress).join(', ')}`)
  }

  if (input.bcc?.length) {
    lines.push(`Bcc: ${input.bcc.map(formatAddress).join(', ')}`)
  }

  const subject = input.subject || originalHeaders.subject || ''
  const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`
  lines.push(`Subject: ${replySubject}`)

  if (originalHeaders.messageId) {
    lines.push(`In-Reply-To: ${originalHeaders.messageId}`)
    lines.push(`References: ${originalHeaders.messageId}`)
  }

  lines.push(`Content-Type: ${input.isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`)
  lines.push('MIME-Version: 1.0')
  lines.push('')
  lines.push(input.body)

  return Buffer.from(lines.join('\r\n')).toString('base64url')
}

export const threadReply = pikkuSessionlessFunc({
  description: 'Sends a reply to the last message in a thread',
  node: { displayName: 'Reply to Thread', category: 'Threads', type: 'action' },
  input: ThreadReplyInput,
  output: ThreadReplyOutput,
  func: async ({ gmail }, input) => {
    const thread = await gmail.request<{
      messages?: Array<{
        id: string
        payload?: {
          headers?: Array<{ name: string; value: string }>
        }
      }>
    }>('GET', `/users/me/threads/${input.threadId}`, {
      qs: { format: 'metadata', metadataHeaders: 'Message-ID,Subject' },
    })

    const lastMessage = thread.messages?.[thread.messages.length - 1]
    const headers = lastMessage?.payload?.headers || []
    const messageIdHeader = headers.find((h) => h.name === 'Message-ID')?.value
    const subjectHeader = headers.find((h) => h.name === 'Subject')?.value

    const raw = createReplyMessage(input, {
      messageId: messageIdHeader,
      subject: subjectHeader,
    })

    return gmail.request<z.infer<typeof ThreadReplyOutput>>(
      'POST',
      '/users/me/messages/send',
      { body: { raw, threadId: input.threadId } }
    )
  },
})
