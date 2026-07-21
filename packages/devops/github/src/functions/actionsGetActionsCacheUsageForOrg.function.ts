// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetActionsCacheUsageForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const ActionsGetActionsCacheUsageForOrgOutput = z.object({
  total_active_caches_count: z.number().int().describe("The count of active caches across all repositories of an enterprise or an organization."),
  total_active_caches_size_in_bytes: z.number().int().describe("The total size in bytes of all active cache items across all repositories of an enterprise or an organization."),
})

export const actionsGetActionsCacheUsageForOrg = pikkuSessionlessFunc({
  description: "Gets the total GitHub Actions cache usage for an organization.\nThe data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.\nYou must authenticate using an access token with the `read:org` scope to use this endpoint. GitHub Apps must have the `organization_admistration:read` permission to use this endpoint.",
  input: ActionsGetActionsCacheUsageForOrgInput,
  output: ActionsGetActionsCacheUsageForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/cache/usage", data) as any
  },
})
