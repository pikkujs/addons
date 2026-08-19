import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarDeleteEventInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const groupCalendarDeleteEvent = pikkuSessionlessFunc({
  input: GroupCalendarDeleteEventInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/groups/{group-id}/calendar/events/{event-id}", data)
  },
})
