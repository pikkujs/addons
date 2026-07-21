import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
})

export const userEventPermanentDelete = pikkuSessionlessFunc({
  input: UserEventPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events/{event-id}/microsoft.graph.permanentDelete", data)
  },
})
