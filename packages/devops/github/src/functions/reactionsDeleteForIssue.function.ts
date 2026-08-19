// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsDeleteForIssueInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  reaction_id: z.number().int().describe("The unique identifier of the reaction."),
})

export const reactionsDeleteForIssue = pikkuSessionlessFunc({
  description: "**Note:** You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/issues/:issue_number/reactions/:reaction_id`.\n\nDelete a reaction to an [issue](https://docs.github.com/rest/reference/issues/).",
  input: ReactionsDeleteForIssueInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", data)
  },
})
