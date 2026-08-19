import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGroupCalendarEventGetCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarGroupCalendarEventGetCalendarOutput = z.any()

export const userCalendarGroupCalendarEventGetCalendar = pikkuSessionlessFunc({
  description: "The calendar that contains the event. Navigation property. Read-only.",
  input: UserCalendarGroupCalendarEventGetCalendarInput,
  output: UserCalendarGroupCalendarEventGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/calendar", data) as any
  },
})
