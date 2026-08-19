import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowEmailNotificationInput = z.object({
  notification_id: z.number().int().describe("The id of the email notification. Example: 7824075373693"),
})

export const ShowEmailNotificationOutput = z.object({
  email_notification: z.object({
    comment_id: z.number().int().optional().describe("The comment ID associated to this email notification"),
    created_at: z.string().datetime().optional().describe("When this email notification was created"),
    email_id: z.string().optional().describe("The email ID of this email notification"),
    message_id: z.string().optional().describe("The value of the Message-Id header of the email"),
    notification_id: z.number().int().optional().describe("The notification id of this email notification"),
    recipients: z.array(z.object({
      delivery_status: z.object({
        code: z.string().optional().describe("The delivery status code (SMTP code and DSN code)"),
        id: z.number().int().optional().describe("The delivery status id"),
        message: z.string().optional().describe("The delivery status description"),
        name: z.string().optional().describe("The delivery status type (key)"),
      }).optional().describe("Details about the delivery status"),
      email_address: z.string().optional().describe("The recipient's email address"),
      user_id: z.number().int().optional().describe("The recipient's user id"),
    })).optional().describe("The list of recipients associated to this email notification"),
    ticket_id: z.number().int().optional().describe("The ticket ID associated to this email notification"),
    updated_at: z.string().datetime().optional().describe("When this email notification was last updated"),
    url: z.string().optional().describe("The API url of this email notification"),
  }).optional(),
})

export const showEmailNotification = pikkuSessionlessFunc({
  description: "Shows details on an email notification. You can get the value of the `notification_id` parameter by listing the ticket's outbound emails.\n\n#### Allowed For\n\n* Agents",
  input: ShowEmailNotificationInput,
  output: ShowEmailNotificationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/email_notifications/{notification_id}", data) as any
  },
})
