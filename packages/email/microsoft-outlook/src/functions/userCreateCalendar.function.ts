import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateCalendarInput = z.any()

export const UserCreateCalendarOutput = z.any()

export const userCreateCalendar = pikkuSessionlessFunc({
  input: UserCreateCalendarInput,
  output: UserCreateCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars", data) as any
  },
})
