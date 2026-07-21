// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReactionsDeleteForIssueCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
  reaction_id: z.number().int().describe("The unique identifier of the reaction."),
})

export const reactionsDeleteForIssueComment = pikkuSessionlessFunc({
  description: "**Note:** You can also specify a repository by `repository_id` using the route `DELETE delete /repositories/:repository_id/issues/comments/:comment_id/reactions/:reaction_id`.\n\nDelete a reaction to an [issue comment](https://docs.github.com/rest/reference/issues#comments).",
  input: ReactionsDeleteForIssueCommentInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", data)
  },
})
