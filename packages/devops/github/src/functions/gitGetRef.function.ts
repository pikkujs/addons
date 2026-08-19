// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GitGetRefInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().describe("ref parameter"),
})

export const GitGetRefOutput = z.object({
  node_id: z.string(),
  object: z.object({
    sha: z.string().min(40).max(40).describe("SHA for the reference"),
    type: z.string(),
    url: z.string().url(),
  }),
  ref: z.string(),
  url: z.string().url(),
}).describe("Git references within a repository")

export const gitGetRef = pikkuSessionlessFunc({
  description: "Returns a single reference from your Git database. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't match an existing ref, a `404` is returned.\n\n**Note:** You need to explicitly [request a pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) to trigger a test merge commit, which checks the mergeability of pull requests. For more information, see \"[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)\".",
  input: GitGetRefInput,
  output: GitGetRefOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/ref/{ref}", data) as any
  },
})
