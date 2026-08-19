// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersDeleteGpgKeyForAuthenticatedUserInput = z.object({
  gpg_key_id: z.number().int().describe("The unique identifier of the GPG key."),
})

export const usersDeleteGpgKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Removes a GPG key from the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `admin:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersDeleteGpgKeyForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/gpg_keys/{gpg_key_id}", data)
  },
})
