import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteUploadInput = z.object({
  token: z.string().describe("The token of the uploaded attachment. Example: \"6bk3gql82em5nmf\""),
})

export const deleteUpload = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* End Users",
  input: DeleteUploadInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/uploads/{token}", data)
  },
})
