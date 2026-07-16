import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventAcceptInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  SendResponse: z.boolean().nullable().optional().default(false),
  Comment: z.string().nullable().optional(),
})

export const userEventAccept = pikkuSessionlessFunc({
  description: "Accept the specified event in a user calendar.",
  input: UserEventAcceptInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events/{event-id}/microsoft.graph.accept", data)
  },
})
