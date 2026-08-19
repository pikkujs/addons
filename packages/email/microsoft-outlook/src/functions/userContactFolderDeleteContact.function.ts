import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserContactFolderDeleteContactInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "contactFolder-id": z.string().describe("The unique identifier of contactFolder"),
  "contact-id": z.string().describe("The unique identifier of contact"),
  "If-Match": z.string().optional().describe("ETag"),
})

export const userContactFolderDeleteContact = pikkuSessionlessFunc({
  input: UserContactFolderDeleteContactInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("DELETE", "/users/{user-id}/contactFolders/{contactFolder-id}/contacts/{contact-id}", data)
  },
})
