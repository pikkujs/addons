// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposRemoveUserAccessRestrictionsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
  body: z.union([z.object({
  users: z.array(z.string()).describe("The username for users"),
}), z.array(z.string())]),
})

export const ReposRemoveUserAccessRestrictionsOutput = z.array(z.object({
  avatar_url: z.string().url(),
  email: z.string().nullable().optional(),
  events_url: z.string(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  gravatar_id: z.string().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  login: z.string(),
  name: z.string().nullable().optional(),
  node_id: z.string(),
  organizations_url: z.string().url(),
  received_events_url: z.string().url(),
  repos_url: z.string().url(),
  site_admin: z.boolean(),
  starred_at: z.string().optional(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  type: z.string(),
  url: z.string().url(),
}))

export const reposRemoveUserAccessRestrictions = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nRemoves the ability of a user to push to this branch.\n\n| Type    | Description                                                                                                                                   |\n| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |\n| `array` | Usernames of the people who should no longer have push access. **Note**: The list of users, apps, and teams in total is limited to 100 items. |",
  input: ReposRemoveUserAccessRestrictionsInput,
  output: ReposRemoveUserAccessRestrictionsOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", data) as any
  },
})
