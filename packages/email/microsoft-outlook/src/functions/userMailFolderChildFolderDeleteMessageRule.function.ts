import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserMailFolderChildFolderDeleteMessageRuleInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "mailFolder-id1": z.string().describe("The unique identifier of mailFolder"),
  "messageRule-id": z.string().describe("The unique identifier of messageRule"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderChildFolderDeleteMessageRule = pikkuSessionlessFunc({
  input: UserMailFolderChildFolderDeleteMessageRuleInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/childFolders/{mailFolder-id1}/messageRules/{messageRule-id}", data)
  },
})
