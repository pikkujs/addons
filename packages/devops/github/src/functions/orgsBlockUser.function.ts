// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const OrgsBlockUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsBlockUser = pikkuSessionlessFunc({
  input: OrgsBlockUserInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/blocks/{username}", data)
  },
})
