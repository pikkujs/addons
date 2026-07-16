import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserGetCalendar2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserGetCalendar2Output = z.any()

export const userGetCalendar2 = pikkuSessionlessFunc({
  description: "The user's calendars. Read-only. Nullable.",
  input: UserGetCalendar2Input,
  output: UserGetCalendar2Output,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendars/{calendar-id}", data) as any
  },
})
