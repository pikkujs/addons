import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGroupUpdateCalendarInput = z.any()

export const UserCalendarGroupUpdateCalendarOutput = z.any()

export const userCalendarGroupUpdateCalendar = pikkuSessionlessFunc({
  input: UserCalendarGroupUpdateCalendarInput,
  output: UserCalendarGroupUpdateCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}", data) as any
  },
})
