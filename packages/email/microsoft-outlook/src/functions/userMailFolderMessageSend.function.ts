import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderMessageSendInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
})

export const userMailFolderMessageSend = pikkuSessionlessFunc({
  description: "Send an existing draft message. The draft message can be a new message draft, reply draft, reply-all draft, or a forward draft. This method saves the message in the Sent Items folder. Alternatively, send a new message in a single operation.",
  input: UserMailFolderMessageSendInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/mailFolders/{mailFolder-id}/messages/{message-id}/microsoft.graph.send", data)
  },
})
