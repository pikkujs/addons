import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteCalendarGroupInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteCalendarGroup = pikkuSessionlessFunc({
  input: UserDeleteCalendarGroupInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/calendarGroups/{calendarGroup-id}", data)
  },
})
