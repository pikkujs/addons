import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetCalendarGroupInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserGetCalendarGroupOutput = z.any()

export const userGetCalendarGroup = pikkuSessionlessFunc({
  description: "The user's calendar groups. Read-only. Nullable.",
  input: UserGetCalendarGroupInput,
  output: UserGetCalendarGroupOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/{calendarGroup-id}", data) as any
  },
})
