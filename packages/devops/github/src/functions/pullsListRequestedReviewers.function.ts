// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PullsListRequestedReviewersInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
})

export const PullsListRequestedReviewersOutput = z.object({
  teams: z.array(z.object({
    description: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    members_url: z.string(),
    name: z.string(),
    node_id: z.string(),
    parent: z.object({
      description: z.string().nullable().describe("Description of the team"),
      html_url: z.string().url(),
      id: z.number().int().describe("Unique identifier of the team"),
      ldap_dn: z.string().optional().describe("Distinguished Name (DN) that team maps to within LDAP environment"),
      members_url: z.string(),
      name: z.string().describe("Name of the team"),
      node_id: z.string(),
      permission: z.string().describe("Permission that the team will have for its repositories"),
      privacy: z.string().optional().describe("The level of privacy this team should have"),
      repositories_url: z.string().url(),
      slug: z.string(),
      url: z.string().url().describe("URL for the team"),
    }).nullable().describe("Groups of organization members that gives permissions on specified repositories."),
    permission: z.string(),
    permissions: z.object({
      admin: z.boolean(),
      maintain: z.boolean(),
      pull: z.boolean(),
      push: z.boolean(),
      triage: z.boolean(),
    }).optional(),
    privacy: z.string().optional(),
    repositories_url: z.string().url(),
    slug: z.string(),
    url: z.string().url(),
  })),
  users: z.array(z.object({
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
  })),
}).describe("Pull Request Review Request")

export const pullsListRequestedReviewers = pikkuSessionlessFunc({
  description: "Gets the users or teams whose review is requested for a pull request. Once a requested reviewer submits a review, they are no longer considered a requested reviewer. Their review will instead be returned by the [List reviews for a pull request](https://docs.github.com/rest/pulls/reviews#list-reviews-for-a-pull-request) operation.",
  input: PullsListRequestedReviewersInput,
  output: PullsListRequestedReviewersOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", data) as any
  },
})
