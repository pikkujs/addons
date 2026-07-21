import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteEndUserIdentityInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  user_identity_id: z.number().int().describe("The ID of the user identity. Example: 77938"),
})

export const deleteEndUserIdentity = pikkuSessionlessFunc({
  description: "Deletes the identity for a given end user.\n\nIn certain cases, a phone number associated with an identity is still visible on the user profile after the identity has been deleted via API.\n\n#### Allowed For\n\n* Verified end users",
  input: DeleteEndUserIdentityInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/end_users/{user_id}/identities/{user_identity_id}", data)
  },
})
