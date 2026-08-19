import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetCalendarInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserGetCalendarOutput = z.any()

export const userGetCalendar = pikkuSessionlessFunc({
  description: "The user's primary calendar. Read-only.",
  input: UserGetCalendarInput,
  output: UserGetCalendarOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar", data) as any
  },
})
