// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PullsListReviewsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListReviewsOutput = z.array(z.object({
  _links: z.object({
    html: z.object({
      href: z.string(),
    }),
    pull_request: z.object({
      href: z.string(),
    }),
  }),
  author_association: z.enum(["COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", "OWNER"]).describe("How the author is associated with the repository."),
  body: z.string().describe("The text of the review."),
  body_html: z.string().optional(),
  body_text: z.string().optional(),
  commit_id: z.string().nullable().describe("A commit SHA for the review. If the commit object was garbage collected or forcibly deleted, then it no longer exists in Git and this value will be `null`."),
  html_url: z.string().url(),
  id: z.number().int().describe("Unique identifier of the review"),
  node_id: z.string(),
  pull_request_url: z.string().url(),
  state: z.string(),
  submitted_at: z.string().datetime().optional(),
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

export const pullsListReviews = pikkuSessionlessFunc({
  description: "The list of reviews returns in chronological order.",
  input: PullsListReviewsInput,
  output: PullsListReviewsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/reviews", data) as any
  },
})
