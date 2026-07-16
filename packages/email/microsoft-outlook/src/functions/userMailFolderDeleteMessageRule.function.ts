import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserMailFolderDeleteMessageRuleInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "mailFolder-id": z.string().describe("The unique identifier of mailFolder"),
  "messageRule-id": z.string().describe("The unique identifier of messageRule"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userMailFolderDeleteMessageRule = pikkuSessionlessFunc({
  input: UserMailFolderDeleteMessageRuleInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/mailFolders/{mailFolder-id}/messageRules/{messageRule-id}", data)
  },
})
