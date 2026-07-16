// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const PullsListCommentsForReviewInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  review_id: z.number().int().describe("The unique identifier of the review."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListCommentsForReviewOutput = z.array(z.object({
  _links: z.object({
    html: z.object({
      href: z.string(),
    }).describe("Hypermedia Link"),
    pull_request: z.object({
      href: z.string(),
    }).describe("Hypermedia Link"),
    self: z.object({
      href: z.string(),
    }).describe("Hypermedia Link"),
  }),
  author_association: z.enum(["COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", "OWNER"]).describe("How the author is associated with the repository."),
  body: z.string(),
  body_html: z.string().optional(),
  body_text: z.string().optional(),
  commit_id: z.string(),
  created_at: z.string().datetime(),
  diff_hunk: z.string(),
  html_url: z.string().url(),
  id: z.number().int(),
  in_reply_to_id: z.number().int().optional(),
  line: z.number().int().optional().describe("The line of the blob to which the comment applies. The last line of the range for a multi-line comment"),
  node_id: z.string(),
  original_commit_id: z.string(),
  original_line: z.number().int().optional().describe("The original line of the blob to which the comment applies. The last line of the range for a multi-line comment"),
  original_position: z.number().int(),
  original_start_line: z.number().int().nullable().optional().describe("The original first line of the range for a multi-line comment."),
  path: z.string(),
  position: z.number().int().nullable(),
  pull_request_review_id: z.number().int().nullable(),
  pull_request_url: z.string().url(),
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
  side: z.enum(["LEFT", "RIGHT"]).optional().default("RIGHT").describe("The side of the first line of the range for a multi-line comment."),
  start_line: z.number().int().nullable().optional().describe("The first line of the range for a multi-line comment."),
  start_side: z.enum(["LEFT", "RIGHT"]).nullable().optional().default("RIGHT").describe("The side of the first line of the range for a multi-line comment."),
  updated_at: z.string().datetime(),
  url: z.string().url(),
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

export const pullsListCommentsForReview = pikkuSessionlessFunc({
  description: "List comments for a specific pull request review.",
  input: PullsListCommentsForReviewInput,
  output: PullsListCommentsForReviewOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", data) as any
  },
})
