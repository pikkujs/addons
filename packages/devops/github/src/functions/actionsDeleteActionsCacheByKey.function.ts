// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { codescanningrefSchema } from '../github.types.js'

export const ActionsDeleteActionsCacheByKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  key: z.string().describe("A key for identifying the cache."),
  ref: codescanningrefSchema.optional().describe("The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`."),
})

export const ActionsDeleteActionsCacheByKeyOutput = z.object({
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

export const actionsDeleteActionsCacheByKey = pikkuSessionlessFunc({
  description: "Deletes one or more GitHub Actions caches for a repository, using a complete cache key. By default, all caches that match the provided key are deleted, but you can optionally provide a Git ref to restrict deletions to caches that match both the provided key and the Git ref.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\n\nGitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsDeleteActionsCacheByKeyInput,
  output: ActionsDeleteActionsCacheByKeyOutput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/caches", data) as any
  },
})
