// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamsDeleteDiscussionCommentInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  discussion_number: z.number().int().describe("The number that identifies the discussion."),
  comment_number: z.number().int().describe("The number that identifies the comment."),
})

export const teamsDeleteDiscussionCommentInOrg = pikkuSessionlessFunc({
  description: "Deletes a comment on a team discussion. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments/{comment_number}`.",
  input: TeamsDeleteDiscussionCommentInOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}", data)
  },
})
