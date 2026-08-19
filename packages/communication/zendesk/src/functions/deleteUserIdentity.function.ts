import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteUserIdentityInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  user_identity_id: z.number().int().describe("The ID of the user identity. Example: 77938"),
})

export const deleteUserIdentity = pikkuSessionlessFunc({
  description: "Deletes the identity for a given user.\nIn certain cases, a phone number associated with an identity is still visible on the user profile after the identity has been deleted via API. You can remove the phone number from the user profile by updating the `phone` attribute of the user to an empty string. See [Update User via API](/api-reference/ticketing/users/users/#update-user) for details and examples.\n\nDeleting identities with type `messaging` could break messaging functionality. For example, an agent may stop being able to send messages via the messaging channel.\n\n#### Allowed For\n* Agents",
  input: DeleteUserIdentityInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/identities/{user_identity_id}", data)
  },
})
