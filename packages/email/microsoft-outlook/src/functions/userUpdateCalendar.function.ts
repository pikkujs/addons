import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateCalendarInput = z.any()

export const UserUpdateCalendarOutput = z.any()

export const userUpdateCalendar = pikkuSessionlessFunc({
  input: UserUpdateCalendarInput,
  output: UserUpdateCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendar", data) as any
  },
})
