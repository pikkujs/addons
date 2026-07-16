// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReactionsDeleteForPullRequestCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
  reaction_id: z.number().int().describe("The unique identifier of the reaction."),
})

export const reactionsDeleteForPullRequestComment = pikkuSessionlessFunc({
  description: "**Note:** You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/pulls/comments/:comment_id/reactions/:reaction_id.`\n\nDelete a reaction to a [pull request review comment](https://docs.github.com/rest/reference/pulls#review-comments).",
  input: ReactionsDeleteForPullRequestCommentInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", data)
  },
})
