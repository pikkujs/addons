import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowManyEmailNotificationsInput = z.object({
  ids: z.string().optional().describe("Comma-separated list of notification ids. One of ids, comment_ids, or ticket_ids is required.. Example: \"8433702508541,8433348111869\""),
  comment_ids: z.string().optional().describe("Comma-separated list of comment ids. One of ids, comment_ids, or ticket_ids is required.. Example: \"8433348111741,8433544226045,8433702508413\""),
  ticket_ids: z.string().optional().describe("Comma-separated list of ticket ids. One of ids, comment_ids, or ticket_ids is required.. Example: \"35436,35437\""),
})

export const ShowManyEmailNotificationsOutput = z.object({
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

export const showManyEmailNotifications = pikkuSessionlessFunc({
  description: "Shows details of many email notifications. Allows you to query by providing a list of notifications, comments, or tickets IDs.\n\n#### Allowed For\n\n* Agents\n\n#### Filters\n\n* By notification: `?ids=8433702508541,8433348111869`\n* By comment: `?comment_ids=8433348111741,8433544226045,8433702508413`\n* By ticket: `?ticket_ids=730,723`",
  input: ShowManyEmailNotificationsInput,
  output: ShowManyEmailNotificationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/email_notifications/show_many", data) as any
  },
})
