import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderChildFolderSetMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  body: z.string(),
})

export const userMailFolderChildFolderSetMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserMailFolderChildFolderSetMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PUT", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/$value", data)
  },
})
