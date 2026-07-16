import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarCreateEventInput = z.any()

export const UserCalendarCreateEventOutput = z.any()

export const userCalendarCreateEvent = pikkuSessionlessFunc({
  input: UserCalendarCreateEventInput,
  output: UserCalendarCreateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/events", data) as any
  },
})
