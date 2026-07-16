// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const OrgsRemoveOutsideCollaboratorInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsRemoveOutsideCollaborator = pikkuSessionlessFunc({
  description: "Removing a user from this list will remove them from all the organization's repositories.",
  input: OrgsRemoveOutsideCollaboratorInput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/outside_collaborators/{username}", data)
  },
})
