import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserSendMailInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
})

export const userSendMail = pikkuSessionlessFunc({
  description: "Send the message specified in the request body using either JSON or MIME format. When using JSON format, you can include a file attachment in the same sendMail action call. When using MIME format: This method saves the message in the Sent Items folder. Alternatively, create a draft message to send later. To learn more about the steps involved in the backend before a mail is delivered to recipients, see here.",
  input: UserSendMailInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/microsoft.graph.sendMail", data)
  },
})
