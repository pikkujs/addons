import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarUpdateEventInput = z.any()

export const UserCalendarGroupCalendarUpdateEventOutput = z.any()

export const userCalendarGroupCalendarUpdateEvent = pikkuSessionlessFunc({
  input: UserCalendarGroupCalendarUpdateEventInput,
  output: UserCalendarGroupCalendarUpdateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}", data) as any
  },
})
