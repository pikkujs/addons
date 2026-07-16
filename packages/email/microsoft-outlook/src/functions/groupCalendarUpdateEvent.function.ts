import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCalendarUpdateEventInput = z.any()

export const GroupCalendarUpdateEventOutput = z.any()

export const groupCalendarUpdateEvent = pikkuSessionlessFunc({
  description: "Update an event object.",
  input: GroupCalendarUpdateEventInput,
  output: GroupCalendarUpdateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/groups/{group-id}/calendar/events/{event-id}", data) as any
  },
})
