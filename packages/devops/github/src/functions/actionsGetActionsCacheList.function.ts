// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { codescanningrefSchema } from '../github.types.js'

export const ActionsGetActionsCacheListInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
  ref: codescanningrefSchema.optional().describe("The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`."),
  key: z.string().optional().describe("An explicit key or prefix for identifying the cache"),
  sort: z.enum(["created_at", "last_accessed_at", "size_in_bytes"]).optional().default("last_accessed_at").describe("The property to sort the results by. `created_at` means when the cache was created. `last_accessed_at` means when the cache was last accessed. `size_in_bytes` is the size of the cache in bytes."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
})

export const ActionsGetActionsCacheListOutput = z.object({
  actions_caches: z.array(z.object({
    created_at: z.string().datetime().optional(),
    id: z.number().int().optional(),
    key: z.string().optional(),
    last_accessed_at: z.string().datetime().optional(),
    ref: z.string().optional(),
    size_in_bytes: z.number().int().optional(),
    version: z.string().optional(),
  })).describe("Array of caches"),
  total_count: z.number().int().describe("Total number of caches"),
}).describe("Repository actions caches")

export const actionsGetActionsCacheList = pikkuSessionlessFunc({
  description: "Lists the GitHub Actions caches for a repository.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetActionsCacheListInput,
  output: ActionsGetActionsCacheListOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/caches", data) as any
  },
})
