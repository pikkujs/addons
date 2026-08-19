import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGroupCalendarGetEventInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarGroupCalendarGetEventOutput = z.any()

export const userCalendarGroupCalendarGetEvent = pikkuSessionlessFunc({
  description: "The events in the calendar. Navigation property. Read-only.",
  input: UserCalendarGroupCalendarGetEventInput,
  output: UserCalendarGroupCalendarGetEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}", data) as any
  },
})
