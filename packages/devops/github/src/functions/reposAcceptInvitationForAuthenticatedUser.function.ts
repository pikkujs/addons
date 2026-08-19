// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const ReposAcceptInvitationForAuthenticatedUserInput = z.object({
  invitation_id: z.number().int().describe("The unique identifier of the invitation."),
})

export const reposAcceptInvitationForAuthenticatedUser = pikkuSessionlessFunc({
  input: ReposAcceptInvitationForAuthenticatedUserInput,
  errors: [ForbiddenError, NotFoundError, ConflictError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/user/repository_invitations/{invitation_id}", data)
  },
})
