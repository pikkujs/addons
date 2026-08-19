// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersDeletePublicSshKeyForAuthenticatedUserInput = z.object({
  key_id: z.number().int().describe("The unique identifier of the key."),
})

export const usersDeletePublicSshKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Removes a public SSH key from the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `admin:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersDeletePublicSshKeyForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/keys/{key_id}", data)
  },
})
