// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamsGetDiscussionCommentInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  discussion_number: z.number().int().describe("The number that identifies the discussion."),
  comment_number: z.number().int().describe("The number that identifies the comment."),
})

export const TeamsGetDiscussionCommentInOrgOutput = z.object({
  author: z.object({
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
  body: z.string().describe("The main text of the comment."),
  body_html: z.string(),
  body_version: z.string().describe("The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server."),
  created_at: z.string().datetime(),
  discussion_url: z.string().url(),
  html_url: z.string().url(),
  last_edited_at: z.string().datetime().nullable(),
  node_id: z.string(),
  number: z.number().int().describe("The unique sequence number of a team discussion comment."),
  reactions: z.object({
    "+1": z.number().int(),
    "-1": z.number().int(),
    confused: z.number().int(),
    eyes: z.number().int(),
    heart: z.number().int(),
    hooray: z.number().int(),
    laugh: z.number().int(),
    rocket: z.number().int(),
    total_count: z.number().int(),
    url: z.string().url(),
  }).optional(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("A reply to a discussion within a team.")

export const teamsGetDiscussionCommentInOrg = pikkuSessionlessFunc({
  description: "Get a specific comment on a team discussion. OAuth access tokens require the `read:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/discussions/{discussion_number}/comments/{comment_number}`.",
  input: TeamsGetDiscussionCommentInOrgInput,
  output: TeamsGetDiscussionCommentInOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}", data) as any
  },
})
