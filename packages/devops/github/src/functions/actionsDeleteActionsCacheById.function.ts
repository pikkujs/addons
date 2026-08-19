// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteActionsCacheByIdInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  cache_id: z.number().int().describe("The unique identifier of the GitHub Actions cache."),
})

export const actionsDeleteActionsCacheById = pikkuSessionlessFunc({
  description: "Deletes a GitHub Actions cache for a repository, using a cache ID.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\n\nGitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsDeleteActionsCacheByIdInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/caches/{cache_id}", data)
  },
})
