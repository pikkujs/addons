// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const GitUpdateRefInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().describe("The name of the fully qualified reference to update. For example, `refs/heads/master`. If the value doesn't start with `refs` and have at least two slashes, it will be rejected.. Example: \"refs/head/master\""),
  force: z.boolean().optional().default(false).describe("Indicates whether to force the update or to make sure the update is a fast-forward update. Leaving this out or setting it to `false` will make sure you're not overwriting work."),
  sha: z.string().describe("The SHA1 value to set this reference to"),
})

export const GitUpdateRefOutput = z.object({
  node_id: z.string(),
  object: z.object({
    sha: z.string().min(40).max(40).describe("SHA for the reference"),
    type: z.string(),
    url: z.string().url(),
  }),
  ref: z.string(),
  url: z.string().url(),
}).describe("Git references within a repository")

export const gitUpdateRef = pikkuSessionlessFunc({
  input: GitUpdateRefInput,
  output: GitUpdateRefOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/git/refs/{ref}", data) as any
  },
})
