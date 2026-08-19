import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarCreateEvent2Input = z.any()

export const UserCalendarCreateEvent2Output = z.any()

export const userCalendarCreateEvent2 = pikkuSessionlessFunc({
  input: UserCalendarCreateEvent2Input,
  output: UserCalendarCreateEvent2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/events", data) as any
  },
})
