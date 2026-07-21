// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamsCreateDiscussionInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  body: z.string().describe("The discussion post's body text."),
  private: z.boolean().optional().default(false).describe("Private posts are only visible to team members, organization owners, and team maintainers. Public posts are visible to all members of the organization. Set to `true` to create a private post."),
  title: z.string().describe("The discussion post's title."),
})

export const TeamsCreateDiscussionInOrgOutput = z.object({
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
  body: z.string().describe("The main text of the discussion."),
  body_html: z.string(),
  body_version: z.string().describe("The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server."),
  comments_count: z.number().int(),
  comments_url: z.string().url(),
  created_at: z.string().datetime(),
  html_url: z.string().url(),
  last_edited_at: z.string().datetime().nullable(),
  node_id: z.string(),
  number: z.number().int().describe("The unique sequence number of a team discussion."),
  pinned: z.boolean().describe("Whether or not this discussion should be pinned for easy retrieval."),
  private: z.boolean().describe("Whether or not this discussion should be restricted to team members and organization administrators."),
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
  team_url: z.string().url(),
  title: z.string().describe("The title of the discussion."),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("A team discussion is a persistent record of a free-form conversation within a team.")

export const teamsCreateDiscussionInOrg = pikkuSessionlessFunc({
  description: "Creates a new discussion post on a team's page. OAuth access tokens require the `write:discussion` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `POST /organizations/{org_id}/team/{team_id}/discussions`.",
  input: TeamsCreateDiscussionInOrgInput,
  output: TeamsCreateDiscussionInOrgOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/teams/{team_slug}/discussions", data) as any
  },
})
