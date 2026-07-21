// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError, UnprocessableContentError, InternalServerError } from '@pikku/core/errors'

export const CodespacesSetCodespacesBillingInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  selected_usernames: z.array(z.string()).max(100).optional().describe("The usernames of the organization members who should have access to codespaces in the organization. Required when `visibility` is `selected_members`. The provided list of usernames will replace any existing value."),
  visibility: z.enum(["disabled", "selected_members", "all_members", "all_members_and_outside_collaborators"]).describe("Which users can access codespaces in the organization. `disabled` means that no users can access codespaces in the organization."),
})

export const codespacesSetCodespacesBilling = pikkuSessionlessFunc({
  description: "Sets which users can access codespaces in an organization. This is synonymous with granting or revoking codespaces billing permissions for users according to the visibility.\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesSetCodespacesBillingInput,
  errors: [BadRequestError, NotFoundError, UnprocessableContentError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/codespaces/billing", data)
  },
})
