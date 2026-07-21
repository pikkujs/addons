// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetReviewsForRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const ActionsGetReviewsForRunOutput = z.array(z.object({
  comment: z.string().describe("The comment submitted with the deployment review"),
  environments: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time that the environment was created, in ISO 8601 format."),
    html_url: z.string().optional(),
    id: z.number().int().optional().describe("The id of the environment."),
    name: z.string().optional().describe("The name of the environment."),
    node_id: z.string().optional(),
    updated_at: z.string().datetime().optional().describe("The time that the environment was last updated, in ISO 8601 format."),
    url: z.string().optional(),
  })).describe("The list of environments that were approved or rejected"),
  state: z.enum(["approved", "rejected", "pending"]).describe("Whether deployment to the environment(s) was approved or rejected or pending (with comments)"),
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
  }).describe("A GitHub user."),
}))

export const actionsGetReviewsForRun = pikkuSessionlessFunc({
  description: "Anyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetReviewsForRunInput,
  output: ActionsGetReviewsForRunOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/approvals", data) as any
  },
})
