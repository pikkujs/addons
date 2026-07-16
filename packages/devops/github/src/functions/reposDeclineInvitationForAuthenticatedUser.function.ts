// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const ReposDeclineInvitationForAuthenticatedUserInput = z.object({
  invitation_id: z.number().int().describe("The unique identifier of the invitation."),
})

export const reposDeclineInvitationForAuthenticatedUser = pikkuSessionlessFunc({
  input: ReposDeclineInvitationForAuthenticatedUserInput,
  errors: [ForbiddenError, NotFoundError, ConflictError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/repository_invitations/{invitation_id}", data)
  },
})
