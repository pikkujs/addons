import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const EmailAddressSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
})

export const DraftCreateInput = z.object({
  to: z.array(EmailAddressSchema),
  cc: z.array(EmailAddressSchema).optional(),
  bcc: z.array(EmailAddressSchema).optional(),
  subject: z.string(),
  body: z.string(),
  isHtml: z.boolean().optional().default(false),
  replyTo: EmailAddressSchema.optional(),
  threadId: z.string().optional(),
})

export const DraftCreateOutput = z.object({
  id: z.string(),
  message: z.object({
    id: z.string(),
    threadId: z.string(),
    labelIds: z.array(z.string()).optional(),
  }),
})

function formatAddress(addr: { name?: string; email: string }): string {
  return addr.name ? `${addr.name} <${addr.email}>` : addr.email
}

function createRawMessage(input: z.infer<typeof DraftCreateInput>): string {
  const lines: string[] = []

  lines.push(`To: ${input.to.map(formatAddress).join(', ')}`)

  if (input.cc?.length) {
    lines.push(`Cc: ${input.cc.map(formatAddress).join(', ')}`)
  }

  if (input.bcc?.length) {
    lines.push(`Bcc: ${input.bcc.map(formatAddress).join(', ')}`)
  }

  if (input.replyTo) {
    lines.push(`Reply-To: ${formatAddress(input.replyTo)}`)
  }

  lines.push(`Subject: ${input.subject}`)
  lines.push(`Content-Type: ${input.isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`)
  lines.push('MIME-Version: 1.0')
  lines.push('')
  lines.push(input.body)

  return Buffer.from(lines.join('\r\n')).toString('base64url')
}

export const draftCreate = pikkuSessionlessFunc({
  description: 'Creates a new email draft',
  node: { displayName: 'Create Draft', category: 'Drafts', type: 'action' },
  input: DraftCreateInput,
  output: DraftCreateOutput,
  func: async ({ gmail }, input) => {
    const raw = createRawMessage(input)

    const body: { message: { raw: string; threadId?: string } } = {
      message: { raw },
    }

    if (input.threadId) {
      body.message.threadId = input.threadId
    }

    return gmail.request<z.infer<typeof DraftCreateOutput>>(
      'POST',
      '/users/me/drafts',
      { body }
    )
  },
})
