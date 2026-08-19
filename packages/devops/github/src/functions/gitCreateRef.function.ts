// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const GitCreateRefInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  key: z.string().optional(),
  ref: z.string().describe("The name of the fully qualified reference (ie: `refs/heads/master`). If it doesn't start with 'refs' and have at least two slashes, it will be rejected."),
  sha: z.string().describe("The SHA1 value for this reference."),
})

export const GitCreateRefOutput = z.object({
  node_id: z.string(),
  object: z.object({
    sha: z.string().min(40).max(40).describe("SHA for the reference"),
    type: z.string(),
    url: z.string().url(),
  }),
  ref: z.string(),
  url: z.string().url(),
}).describe("Git references within a repository")

export const gitCreateRef = pikkuSessionlessFunc({
  description: "Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.",
  input: GitCreateRefInput,
  output: GitCreateRefOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/git/refs", data) as any
  },
})
