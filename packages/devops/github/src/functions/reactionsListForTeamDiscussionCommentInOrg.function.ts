// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReactionsListForTeamDiscussionCommentInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  discussion_number: z.number().int().describe("The number that identifies the discussion."),
  comment_number: z.number().int().describe("The number that identifies the comment."),
  content: z.enum(["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"]).optional().describe("Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a team discussion comment."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReactionsListForTeamDiscussionCommentInOrgOutput = z.array(z.object({
  content: z.enum(["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"]).describe("The reaction to use"),
  created_at: z.string().datetime(),
  id: z.number().int(),
  node_id: z.string(),
  user: z.object({
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
  }).nullable().describe("A GitHub user."),
}))

export const reactionsListForTeamDiscussionCommentInOrg = pikkuSessionlessFunc({
  description: "List the reactions to a [team discussion comment](https://docs.github.com/rest/reference/teams#discussion-comments/). OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/:org_id/team/:team_id/discussions/:discussion_number/comments/:comment_number/reactions`.",
  input: ReactionsListForTeamDiscussionCommentInOrgInput,
  output: ReactionsListForTeamDiscussionCommentInOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", data) as any
  },
})
