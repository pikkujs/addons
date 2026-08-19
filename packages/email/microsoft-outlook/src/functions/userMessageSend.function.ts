import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMessageSendInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userMessageSend = pikkuSessionlessFunc({
  description: "Send an existing draft message. The draft message can be a new message draft, reply draft, reply-all draft, or a forward draft. This method saves the message in the Sent Items folder. Alternatively, send a new message in a single operation.",
  input: UserMessageSendInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/messages/{message-id}/microsoft.graph.send", data)
  },
})
