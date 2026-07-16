// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposDeleteInvitationInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  invitation_id: z.number().int().describe("The unique identifier of the invitation."),
})

export const reposDeleteInvitation = pikkuSessionlessFunc({
  input: ReposDeleteInvitationInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/invitations/{invitation_id}", data)
  },
})
