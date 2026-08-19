import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UpdateAccountEmailSettingsInput = z.object({
  settings: z.object({
  email: z.object({
    accept_wildcard_emails: z.boolean().optional(),
    custom_dkim_domain: z.boolean().optional(),
    email_sender_authentication: z.boolean().optional().describe("Whether incoming email is subjected to sender authentication checks (SPF, DKIM). This setting is deprecated and will be removed soon. It can still be turned on, but after it's on you can't turn it off"),
    email_sender_authentication_profile: z.enum(["default", "enhanced"]).optional().describe("The sender authentication profile in use."),
    email_status: z.boolean().optional().describe("Whether email status and delivery information is shown in the Agent Workspace"),
    email_template_photos: z.boolean().optional(),
    email_template_selection: z.boolean().optional(),
    gmail_actions: z.boolean().optional(),
    html_mail_template: z.string().optional(),
    mail_delimiter: z.string().optional(),
    modern_email_template: z.boolean().optional(),
    multi_recipient_email_tickets: z.boolean().optional(),
    no_mail_delimiter: z.boolean().optional(),
    personalized_replies: z.boolean().optional(),
    rich_content_in_emails: z.boolean().optional(),
    send_gmail_messages_via_gmail: z.boolean().optional(),
    text_mail_template: z.string().optional(),
  }).describe("Email settings"),
}),
})

export const UpdateAccountEmailSettingsOutput = z.object({
  settings: z.object({
    email: z.object({
      accept_wildcard_emails: z.boolean().optional(),
      custom_dkim_domain: z.boolean().optional(),
      email_sender_authentication: z.boolean().optional().describe("Whether incoming email is subjected to sender authentication checks (SPF, DKIM). This setting is deprecated and will be removed soon. It can still be turned on, but after it's on you can't turn it off"),
      email_sender_authentication_profile: z.enum(["default", "enhanced"]).optional().describe("The sender authentication profile in use."),
      email_status: z.boolean().optional().describe("Whether email status and delivery information is shown in the Agent Workspace"),
      email_template_photos: z.boolean().optional(),
      email_template_selection: z.boolean().optional(),
      gmail_actions: z.boolean().optional(),
      html_mail_template: z.string().optional(),
      mail_delimiter: z.string().optional(),
      modern_email_template: z.boolean().optional(),
      multi_recipient_email_tickets: z.boolean().optional(),
      no_mail_delimiter: z.boolean().optional(),
      personalized_replies: z.boolean().optional(),
      rich_content_in_emails: z.boolean().optional(),
      send_gmail_messages_via_gmail: z.boolean().optional(),
      text_mail_template: z.string().optional(),
    }).optional().describe("Email settings"),
  }).optional(),
})

export const updateAccountEmailSettings = pikkuSessionlessFunc({
  description: "Updates email settings for the account.\n\n#### Allowed For\n\n* Admins\n* Agents with extensions_and_channel_management permission",
  input: UpdateAccountEmailSettingsInput,
  output: UpdateAccountEmailSettingsOutput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/account/email_settings", data) as any
  },
})
