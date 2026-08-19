// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposCreateCommitStatusInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  sha: z.string(),
  context: z.string().optional().default("default").describe("A string label to differentiate this status from the status of other systems. This field is case-insensitive."),
  description: z.string().nullable().optional().describe("A short description of the status."),
  state: z.enum(["error", "failure", "pending", "success"]).describe("The state of the status."),
  target_url: z.string().nullable().optional().describe("The target URL to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the source of the status.  \nFor example, if your continuous integration system is posting build status, you would want to provide the deep link for the build output for this specific SHA:  \n`http://ci.example.com/user/repo/build/sha`"),
})

export const ReposCreateCommitStatusOutput = z.object({
  avatar_url: z.string().nullable(),
  context: z.string(),
  created_at: z.string(),
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
  id: z.number().int(),
  node_id: z.string(),
  state: z.string(),
  target_url: z.string().nullable(),
  updated_at: z.string(),
  url: z.string(),
}).describe("The status of a commit.")

export const reposCreateCommitStatus = pikkuSessionlessFunc({
  description: "Users with push access in a repository can create commit statuses for a given SHA.\n\nNote: there is a limit of 1000 statuses per `sha` and `context` within a repository. Attempts to create more than 1000 statuses will result in a validation error.",
  input: ReposCreateCommitStatusInput,
  output: ReposCreateCommitStatusOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/statuses/{sha}", data) as any
  },
})
