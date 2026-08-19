import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarUpdateEventInput = z.any()

export const UserCalendarUpdateEventOutput = z.any()

export const userCalendarUpdateEvent = pikkuSessionlessFunc({
  input: UserCalendarUpdateEventInput,
  output: UserCalendarUpdateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendar/events/{event-id}", data) as any
  },
})
