import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteCalendar = pikkuSessionlessFunc({
  input: UserDeleteCalendarInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendars/{calendar-id}", data)
  },
})
