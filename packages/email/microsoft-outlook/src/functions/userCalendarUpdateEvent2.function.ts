import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarUpdateEvent2Input = z.any()

export const UserCalendarUpdateEvent2Output = z.any()

export const userCalendarUpdateEvent2 = pikkuSessionlessFunc({
  input: UserCalendarUpdateEvent2Input,
  output: UserCalendarUpdateEvent2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendars/{calendar-id}/events/{event-id}", data) as any
  },
})
