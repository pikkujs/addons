import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserDeleteEventInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userDeleteEvent = pikkuSessionlessFunc({
  input: UserDeleteEventInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/events/{event-id}", data)
  },
})
