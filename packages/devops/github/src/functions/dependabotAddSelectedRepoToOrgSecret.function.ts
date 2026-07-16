// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError } from '@pikku/core/errors'

export const DependabotAddSelectedRepoToOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
  repository_id: z.number().int(),
})

export const dependabotAddSelectedRepoToOrgSecret = pikkuSessionlessFunc({
  description: "Adds a repository to an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/dependabot#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` organization permission to use this endpoint.",
  input: DependabotAddSelectedRepoToOrgSecretInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}", data)
  },
})
