// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsDeleteForTeamDiscussionCommentInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  discussion_number: z.number().int().describe("The number that identifies the discussion."),
  comment_number: z.number().int().describe("The number that identifies the comment."),
  reaction_id: z.number().int().describe("The unique identifier of the reaction."),
})

export const reactionsDeleteForTeamDiscussionComment = pikkuSessionlessFunc({
  description: "**Note:** You can also specify a team or organization with `team_id` and `org_id` using the route `DELETE /organizations/:org_id/team/:team_id/discussions/:discussion_number/comments/:comment_number/reactions/:reaction_id`.\n\nDelete a reaction to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments). OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: ReactionsDeleteForTeamDiscussionCommentInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", data)
  },
})
