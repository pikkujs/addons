import { z } from 'zod'

// Recipient schema
export const MandrillRecipientSchema = z.object({
  email: z.string().describe('Recipient email address'),
  name: z.string().optional().describe('Recipient name'),
  type: z.enum(['to', 'cc', 'bcc']).optional().describe('Recipient type (defaults to "to")'),
})

export type MandrillRecipient = z.infer<typeof MandrillRecipientSchema>

// Template content schema
export const MandrillTemplateContentSchema = z.object({
  name: z.string().describe('Name of the content block to replace'),
  content: z.string().describe('Content to insert'),
})

export type MandrillTemplateContent = z.infer<typeof MandrillTemplateContentSchema>

// Merge variable schema
export const MandrillMergeVarSchema = z.object({
  name: z.string(),
  content: z.string(),
})

export type MandrillMergeVar = z.infer<typeof MandrillMergeVarSchema>

// Send result schema
export const MandrillSendResultSchema = z.object({
  email: z.string(),
  status: z.enum(['sent', 'queued', 'scheduled', 'rejected', 'invalid']),
  reject_reason: z.string().optional(),
  _id: z.string(),
})

export type MandrillSendResult = z.infer<typeof MandrillSendResultSchema>

// Message schema (for API requests)
export const MandrillMessageSchema = z.object({
  html: z.string().optional(),
  text: z.string().optional(),
  subject: z.string(),
  from_email: z.string(),
  from_name: z.string().optional(),
  to: z.array(MandrillRecipientSchema),
  headers: z.record(z.string(), z.string()).optional(),
  important: z.boolean().optional(),
  track_opens: z.boolean().optional(),
  track_clicks: z.boolean().optional(),
  auto_text: z.boolean().optional(),
  auto_html: z.boolean().optional(),
  inline_css: z.boolean().optional(),
  url_strip_qs: z.boolean().optional(),
  preserve_recipients: z.boolean().optional(),
  view_content_link: z.boolean().optional(),
  bcc_address: z.string().optional(),
  tracking_domain: z.string().optional(),
  signing_domain: z.string().optional(),
  return_path_domain: z.string().optional(),
  merge: z.boolean().optional(),
  merge_language: z.enum(['mailchimp', 'handlebars']).optional(),
  global_merge_vars: z.array(MandrillMergeVarSchema).optional(),
  tags: z.array(z.string()).optional(),
  subaccount: z.string().optional(),
  google_analytics_domains: z.array(z.string()).optional(),
  google_analytics_campaign: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export type MandrillMessage = z.infer<typeof MandrillMessageSchema>

// Send options schema
export const MandrillSendOptionsSchema = z.object({
  async: z.boolean().optional(),
  ip_pool: z.string().optional(),
  send_at: z.string().optional(),
})

export type MandrillSendOptions = z.infer<typeof MandrillSendOptionsSchema>
