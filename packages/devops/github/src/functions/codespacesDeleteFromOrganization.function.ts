// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesDeleteFromOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
  codespace_name: z.string().describe("The name of the codespace."),
})

export const CodespacesDeleteFromOrganizationOutput = z.record(z.string(), z.unknown())

export const codespacesDeleteFromOrganization = pikkuSessionlessFunc({
  description: "Deletes a user's codespace.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesDeleteFromOrganizationInput,
  output: CodespacesDeleteFromOrganizationOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/members/{username}/codespaces/{codespace_name}", data) as any
  },
})
