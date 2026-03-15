import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import {
  MandrillRecipientSchema,
  MandrillTemplateContentSchema,
  MandrillMergeVarSchema,
  MandrillSendResultSchema,
} from '../mandrill.types.js'

export const MessageSendTemplateInput = z.object({
  templateName: z.string().describe('Name of the template to use'),
  templateContent: z.array(MandrillTemplateContentSchema).optional().describe('Content to replace in the template'),
  fromEmail: z.string().describe('Sender email address'),
  fromName: z.string().optional().describe('Sender name'),
  to: z.array(MandrillRecipientSchema).describe('Array of recipient objects'),
  subject: z.string().describe('Email subject'),
  tags: z.array(z.string()).optional().describe('Tags for categorizing the email'),
  trackOpens: z.boolean().optional().describe('Track email opens'),
  trackClicks: z.boolean().optional().describe('Track link clicks'),
  important: z.boolean().optional().describe('Mark as important'),
  async: z.boolean().optional().describe('Send asynchronously'),
  sendAt: z.string().optional().describe('UTC timestamp for scheduled delivery (YYYY-MM-DD HH:MM:SS)'),
  globalMergeVars: z.array(MandrillMergeVarSchema).optional().describe('Global merge variables for template'),
})

export const MessageSendTemplateOutput = z.array(MandrillSendResultSchema)

type Input = z.infer<typeof MessageSendTemplateInput>
type Output = z.infer<typeof MessageSendTemplateOutput>

export const mandrillMessageSendTemplate = pikkuSessionlessFunc({
  description: 'Send an email using a Mandrill template',
  node: { displayName: 'Send Template Email', category: 'Messages', type: 'action' },
  input: MessageSendTemplateInput,
  output: MessageSendTemplateOutput,
  func: async ({ mandrill }, data) => {
    return mandrill.sendTemplate(
      data.templateName,
      data.templateContent || [],
      {
        from_email: data.fromEmail,
        from_name: data.fromName,
        to: data.to,
        subject: data.subject,
        tags: data.tags,
        track_opens: data.trackOpens,
        track_clicks: data.trackClicks,
        important: data.important,
        global_merge_vars: data.globalMergeVars,
      },
      {
        async: data.async,
        send_at: data.sendAt,
      }
    )
  },
})
