// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetActionsCacheUsageInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsGetActionsCacheUsageOutput = z.object({
  active_caches_count: z.number().int().describe("The number of active caches in the repository."),
  active_caches_size_in_bytes: z.number().int().describe("The sum of the size in bytes of all the active cache items in the repository."),
  full_name: z.string().describe("The repository owner and name for the cache usage being shown."),
}).describe("GitHub Actions Cache Usage by repository.")

export const actionsGetActionsCacheUsage = pikkuSessionlessFunc({
  description: "Gets GitHub Actions cache usage for a repository.\nThe data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.\nAnyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetActionsCacheUsageInput,
  output: ActionsGetActionsCacheUsageOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/cache/usage", data) as any
  },
})
