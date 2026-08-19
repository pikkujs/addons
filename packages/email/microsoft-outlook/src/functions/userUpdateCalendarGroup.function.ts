import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserUpdateCalendarGroupInput = z.any()

export const UserUpdateCalendarGroupOutput = z.any()

export const userUpdateCalendarGroup = pikkuSessionlessFunc({
  input: UserUpdateCalendarGroupInput,
  output: UserUpdateCalendarGroupOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendarGroups/{calendarGroup-id}", data) as any
  },
})
