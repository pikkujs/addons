// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GitListMatchingRefsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().describe("ref parameter"),
})

export const GitListMatchingRefsOutput = z.array(z.object({
  node_id: z.string(),
  object: z.object({
    sha: z.string().min(40).max(40).describe("SHA for the reference"),
    type: z.string(),
    url: z.string().url(),
  }),
  ref: z.string(),
  url: z.string().url(),
}))

export const gitListMatchingRefs = pikkuSessionlessFunc({
  description: "Returns an array of references from your Git database that match the supplied name. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't exist in the repository, but existing refs start with `:ref`, they will be returned as an array.\n\nWhen you use this endpoint without providing a `:ref`, it will return an array of all the references from your Git database, including notes and stashes if they exist on the server. Anything in the namespace is returned, not just `heads` and `tags`.\n\n**Note:** You need to explicitly [request a pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) to trigger a test merge commit, which checks the mergeability of pull requests. For more information, see \"[Checking mergeability of pull requests](https://docs.github.com/rest/guides/getting-started-with-the-git-database-api#checking-mergeability-of-pull-requests)\".\n\nIf you request matching references for a branch named `feature` but the branch `feature` doesn't exist, the response can still include other matching head refs that start with the word `feature`, such as `featureA` and `featureB`.",
  input: GitListMatchingRefsInput,
  output: GitListMatchingRefsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/matching-refs/{ref}", data) as any
  },
})
