// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsCancelInvitationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  invitation_id: z.number().int().describe("The unique identifier of the invitation."),
})

export const orgsCancelInvitation = pikkuSessionlessFunc({
  description: "Cancel an organization invitation. In order to cancel an organization invitation, the authenticated user must be an organization owner.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications).",
  input: OrgsCancelInvitationInput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/invitations/{invitation_id}", data)
  },
})
