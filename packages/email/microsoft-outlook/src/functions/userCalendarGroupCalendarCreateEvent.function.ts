import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarCreateEventInput = z.any()

export const UserCalendarGroupCalendarCreateEventOutput = z.any()

export const userCalendarGroupCalendarCreateEvent = pikkuSessionlessFunc({
  input: UserCalendarGroupCalendarCreateEventInput,
  output: UserCalendarGroupCalendarCreateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events", data) as any
  },
})
