// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError, UnprocessableContentError, InternalServerError } from '@pikku/core/errors'

export const CodespacesDeleteCodespacesBillingUsersInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  selected_usernames: z.array(z.string()).max(100).describe("The usernames of the organization members whose codespaces should not be billed to the organization."),
})

export const codespacesDeleteCodespacesBillingUsers = pikkuSessionlessFunc({
  description: "Codespaces for the specified users will no longer be billed to the organization.\nTo use this endpoint, the billing settings for the organization must be set to `selected_members`. For information on how to change this setting please see [these docs].(https://docs.github.com/rest/codespaces/organizations#manage-access-control-for-organization-codespaces) You must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesDeleteCodespacesBillingUsersInput,
  errors: [BadRequestError, NotFoundError, UnprocessableContentError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/codespaces/billing/selected_users", data)
  },
})
