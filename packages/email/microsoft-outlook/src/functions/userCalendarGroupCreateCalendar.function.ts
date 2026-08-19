import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarGroupCreateCalendarInput = z.any()

export const UserCalendarGroupCreateCalendarOutput = z.any()

export const userCalendarGroupCreateCalendar = pikkuSessionlessFunc({
  input: UserCalendarGroupCreateCalendarInput,
  output: UserCalendarGroupCreateCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars", data) as any
  },
})
