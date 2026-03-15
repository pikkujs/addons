import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailSchema = z.object({
  email: z.string().describe('Email address'),
  name: z.string().optional().describe('Name of the recipient'),
})

export const ContentSchema = z.object({
  type: z.enum(['text/plain', 'text/html']).describe('The MIME type of the content'),
  value: z.string().describe('The actual content of the message'),
})

export const AttachmentSchema = z.object({
  content: z.string().describe('The Base64 encoded content of the attachment'),
  filename: z.string().describe('The filename of the attachment'),
  type: z.string().optional().describe('The MIME type of the attachment'),
  disposition: z.enum(['inline', 'attachment']).optional().describe('How the attachment should be displayed'),
})

export const PersonalizationSchema = z.object({
  to: z.array(EmailSchema).describe('An array of recipients'),
  cc: z.array(EmailSchema).optional().describe('An array of recipients who will receive a copy'),
  bcc: z.array(EmailSchema).optional().describe('An array of recipients who will receive a blind copy'),
  subject: z.string().optional().describe('The subject of the email'),
  dynamic_template_data: z.record(z.string(), z.any()).optional().describe('Dynamic template data for SendGrid templates'),
  send_at: z.number().optional().describe('Unix timestamp for scheduled sending'),
})

export const MailSendInput = z.object({
  personalizations: z.array(PersonalizationSchema).describe('An array of messages and their metadata'),
  from: EmailSchema.describe('The sender email address'),
  reply_to: EmailSchema.optional().describe('The reply-to email address'),
  reply_to_list: z.array(EmailSchema).optional().describe('An array of reply-to email addresses'),
  subject: z.string().optional().describe('The global subject of the email'),
  content: z.array(ContentSchema).optional().describe('An array of content objects'),
  attachments: z.array(AttachmentSchema).optional().describe('An array of attachment objects'),
  template_id: z.string().optional().describe('The ID of a SendGrid dynamic template'),
  headers: z.record(z.string(), z.string()).optional().describe('Custom headers for the email'),
  categories: z.array(z.string()).optional().describe('Categories for the email'),
  send_at: z.number().optional().describe('Unix timestamp for scheduled sending'),
  ip_pool_name: z.string().optional().describe('The IP pool to send from'),
  mail_settings: z.object({
    sandbox_mode: z.object({
      enable: z.boolean().describe('Enable sandbox mode for testing'),
    }).optional(),
  }).optional().describe('Mail settings for the email'),
})

export const MailSendOutput = z.object({
  success: z.boolean().describe('Whether the email was accepted for delivery'),
})

type Output = z.infer<typeof MailSendOutput>

type Input = z.infer<typeof MailSendInput>

export const mailSend = pikkuSessionlessFunc({
  description: 'Sends an email through SendGrid',
  node: { displayName: 'Send Email', category: 'Mail', type: 'action' },
  input: MailSendInput,
  output: MailSendOutput,
  func: async ({ sendgrid }, data) => {
    await sendgrid.request('POST', '/mail/send', { body: data as Input })
    return { success: true }
  },
})
