// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const GitGetTreeInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tree_sha: z.string(),
  recursive: z.string().optional().describe("Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in `:tree_sha`. For example, setting `recursive` to any of the following will enable returning objects or subtrees: `0`, `1`, `\"true\"`, and `\"false\"`. Omit this parameter to prevent recursively returning objects or subtrees."),
})

export const GitGetTreeOutput = z.object({
  sha: z.string(),
  tree: z.array(z.object({
    mode: z.string().optional(),
    path: z.string().optional(),
    sha: z.string().optional(),
    size: z.number().int().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
  })).describe("Objects specifying a tree structure"),
  truncated: z.boolean(),
  url: z.string().url(),
}).describe("The hierarchy between files in a Git repository.")

export const gitGetTree = pikkuSessionlessFunc({
  description: "Returns a single tree using the SHA1 value for that tree.\n\nIf `truncated` is `true` in the response then the number of items in the `tree` array exceeded our maximum limit. If you need to fetch more items, use the non-recursive method of fetching trees, and fetch one sub-tree at a time.\n\n\n**Note**: The limit for the `tree` array is 100,000 entries with a maximum size of 7 MB when using the `recursive` parameter.",
  input: GitGetTreeInput,
  output: GitGetTreeOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/trees/{tree_sha}", data) as any
  },
})
