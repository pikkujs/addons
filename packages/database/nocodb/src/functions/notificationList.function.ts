import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NotificationListInput = z.object({
  is_read: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

export const NotificationListOutput = z.object({
  list: z.array(z.object({
    id: z.string().min(0).max(20).optional().describe("Unique ID"),
    is_read: z.boolean().optional().describe("Whether the notification has been read by the user"),
    is_deleted: z.boolean().optional().describe("Whether the notification has been deleted by the user"),
    type: z.string().optional().describe("Type of notification"),
    updated_at: z.unknown().optional(),
    created_at: z.unknown().optional(),
  })).describe("List of notification objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for Notification List")

export const notificationList = pikkuSessionlessFunc({
  description: "List notifications",
  input: NotificationListInput,
  output: NotificationListOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/notifications", data) as any
  },
})
