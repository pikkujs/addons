import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMessagePermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userMessagePermanentDelete = pikkuSessionlessFunc({
  input: UserMessagePermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/messages/{message-id}/microsoft.graph.permanentDelete", data)
  },
})
