import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListEmailNotificationsInput = z.object({
  filter: z.object({
  comment_id: z.number().int().optional(),
  notification_id: z.number().int().optional(),
  ticket_id: z.number().int().optional(),
}).describe("Filters the email notifications by ticket, comment, or notification id.\n"),
  per_page: z.number().int().optional().describe("The number of records to return per page"),
  sort: z.string().optional().describe("The field to sort the list.  Possible values are \"created_at\", \"updated_at\" (ascending order) or \"-created_at\", \"-updated_at\" (descending order). Example: \"updated_at\""),
})

export const ListEmailNotificationsOutput = z.object({
  email_notifications: z.array(z.object({
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
  })).optional(),
})

export const listEmailNotifications = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\n#### Request parameters\n\n##### Filters\n\n**Important**: You must specify a `filter` query parameter to narrow the scope of the search for this endpoint.\n\n* By notification: `api/v2/email_notifications?filter[notification_id]=7824075373693`\n* By comment: `api/v2/email_notifications?filter[comment_id]=782407`\n* By ticket: `api/v2/email_notifications?filter[ticket_id]=623`\n\n##### Pagination\n\nBy default, a maximum of 100 email notifications are included per page. Use cursor-based pagination parameters (`page[after]` and `page[before]`) to navigate the records (can't be used together in the same request). See [Pagination](/api-reference/introduction/pagination/) for more details.\n\n##### Sorting\n\nBy default, email notifications are sorted by creation time (newest first). The query parameter is not supported for this endpoint.",
  input: ListEmailNotificationsInput,
  output: ListEmailNotificationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/email_notifications", data) as any
  },
})
