import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateCalendar2Input = z.any()

export const UserUpdateCalendar2Output = z.any()

export const userUpdateCalendar2 = pikkuSessionlessFunc({
  input: UserUpdateCalendar2Input,
  output: UserUpdateCalendar2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendars/{calendar-id}", data) as any
  },
})
