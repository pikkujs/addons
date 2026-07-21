// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetActionsCacheUsageByRepoForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsGetActionsCacheUsageByRepoForOrgOutput = z.object({
  repository_cache_usages: z.array(z.object({
    active_caches_count: z.number().int().describe("The number of active caches in the repository."),
    active_caches_size_in_bytes: z.number().int().describe("The sum of the size in bytes of all the active cache items in the repository."),
    full_name: z.string().describe("The repository owner and name for the cache usage being shown."),
  })),
  total_count: z.number().int(),
})

export const actionsGetActionsCacheUsageByRepoForOrg = pikkuSessionlessFunc({
  description: "Lists repositories and their GitHub Actions cache usage for an organization.\nThe data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.\nYou must authenticate using an access token with the `read:org` scope to use this endpoint. GitHub Apps must have the `organization_admistration:read` permission to use this endpoint.",
  input: ActionsGetActionsCacheUsageByRepoForOrgInput,
  output: ActionsGetActionsCacheUsageByRepoForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/cache/usage-by-repository", data) as any
  },
})
