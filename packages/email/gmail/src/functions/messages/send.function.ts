import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const EmailAddressSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

const AttachmentSchema = z.object({
  filename: z.string(),
  content: z.string(),
  mimeType: z.string().optional().default('application/octet-stream'),
})

export const MessageSendInput = z.object({
  to: z.array(EmailAddressSchema),
  cc: z.array(EmailAddressSchema).optional(),
  bcc: z.array(EmailAddressSchema).optional(),
  subject: z.string(),
  body: z.string(),
  isHtml: z.boolean().optional().default(false),
  replyTo: EmailAddressSchema.optional(),
  threadId: z.string().optional(),
  attachments: z.array(AttachmentSchema).optional(),
})

export const MessageSendOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()),
})

function formatAddress(addr: { email: string; name?: string }): string {
  if (addr.name) {
    return `${addr.name} <${addr.email}>`
  }
  return addr.email
}

function createRawMessage(input: z.infer<typeof MessageSendInput>): string {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substr(2)}`
  const hasAttachments = input.attachments && input.attachments.length > 0

  const headers: string[] = []

  headers.push(`To: ${input.to.map(formatAddress).join(', ')}`)

  if (input.cc?.length) {
    headers.push(`Cc: ${input.cc.map(formatAddress).join(', ')}`)
  }

  if (input.bcc?.length) {
    headers.push(`Bcc: ${input.bcc.map(formatAddress).join(', ')}`)
  }

  if (input.replyTo) {
    headers.push(`Reply-To: ${formatAddress(input.replyTo)}`)
  }

  headers.push(`Subject: ${input.subject}`)
  headers.push('MIME-Version: 1.0')

  if (hasAttachments) {
    headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`)
    headers.push('')
    headers.push(`--${boundary}`)

    const contentType = input.isHtml ? 'text/html' : 'text/plain'
    headers.push(`Content-Type: ${contentType}; charset=utf-8`)
    headers.push('')
    headers.push(input.body)

    for (const attachment of input.attachments!) {
      headers.push(`--${boundary}`)
      headers.push(`Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`)
      headers.push('Content-Transfer-Encoding: base64')
      headers.push(`Content-Disposition: attachment; filename="${attachment.filename}"`)
      headers.push('')
      headers.push(attachment.content)
    }

    headers.push(`--${boundary}--`)
  } else {
    const contentType = input.isHtml ? 'text/html' : 'text/plain'
    headers.push(`Content-Type: ${contentType}; charset=utf-8`)
    headers.push('')
    headers.push(input.body)
  }

  return Buffer.from(headers.join('\r\n')).toString('base64url')
}

export const messageSend = pikkuSessionlessFunc({
  description: 'Sends an email through Gmail',
  node: { displayName: 'Send Email', category: 'Messages', type: 'action' },
  input: MessageSendInput,
  output: MessageSendOutput,
  func: async ({ gmail }, input) => {
    const raw = createRawMessage(input)

    const body: { raw: string; threadId?: string } = { raw }
    if (input.threadId) {
      body.threadId = input.threadId
    }

    const result = await gmail.request<{
      id: string
      threadId: string
      labelIds: string[]
    }>('POST', '/users/me/messages/send', { body })

    return {
      id: result.id,
      threadId: result.threadId,
      labelIds: result.labelIds || [],
    }
  },
})
