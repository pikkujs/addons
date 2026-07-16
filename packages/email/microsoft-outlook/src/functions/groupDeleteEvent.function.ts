import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupDeleteEventInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const groupDeleteEvent = pikkuSessionlessFunc({
  description: "Delete an event object.",
  input: GroupDeleteEventInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/groups/{group-id}/events/{event-id}", data)
  },
})
