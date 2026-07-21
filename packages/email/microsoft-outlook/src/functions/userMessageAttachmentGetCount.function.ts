import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMessageAttachmentGetCountInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
})

export const userMessageAttachmentGetCount = pikkuSessionlessFunc({
  input: UserMessageAttachmentGetCountInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/messages/{message-id}/attachments/$count", data)
  },
})
