import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCreateCalendarGroupInput = z.any()

export const UserCreateCalendarGroupOutput = z.any()

export const userCreateCalendarGroup = pikkuSessionlessFunc({
  input: UserCreateCalendarGroupInput,
  output: UserCreateCalendarGroupOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups", data) as any
  },
})
