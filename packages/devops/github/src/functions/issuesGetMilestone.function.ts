// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesGetMilestoneInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  milestone_number: z.number().int().describe("The number that identifies the milestone."),
})

export const IssuesGetMilestoneOutput = z.object({
  closed_at: z.string().datetime().nullable(),
  closed_issues: z.number().int(),
  created_at: z.string().datetime(),
  creator: z.object({
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
  description: z.string().nullable(),
  due_on: z.string().datetime().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  labels_url: z.string().url(),
  node_id: z.string(),
  number: z.number().int().describe("The number of the milestone."),
  open_issues: z.number().int(),
  state: z.enum(["open", "closed"]).default("open").describe("The state of the milestone."),
  title: z.string().describe("The title of the milestone."),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("A collection of related issues and pull requests.")

export const issuesGetMilestone = pikkuSessionlessFunc({
  input: IssuesGetMilestoneInput,
  output: IssuesGetMilestoneOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/milestones/{milestone_number}", data) as any
  },
})
