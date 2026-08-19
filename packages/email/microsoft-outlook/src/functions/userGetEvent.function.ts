import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserGetEventInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserGetEventOutput = z.any()

export const userGetEvent = pikkuSessionlessFunc({
  description: "The user's events. Default is to show Events under the Default Calendar. Read-only. Nullable.",
  input: UserGetEventInput,
  output: UserGetEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/events/{event-id}", data) as any
  },
})
