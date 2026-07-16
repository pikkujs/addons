import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderChildFolderDeleteMessagesContentInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "message-id": z.string().describe("The unique identifier of message"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderChildFolderDeleteMessagesContent = pikkuSessionlessFunc({
  description: "The unique identifier for an entity. Read-only.",
  input: UserMailFolderChildFolderDeleteMessagesContentInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messages/{message-id}/$value", data)
  },
})
