// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PullsListReviewCommentsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  sort: z.enum(["created", "updated"]).optional().default("created").describe("The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to."),
  direction: z.enum(["asc", "desc"]).optional().describe("The direction to sort results. Ignored without `sort` parameter."),
  since: z.string().datetime().optional().describe("Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListReviewCommentsOutput = z.array(z.object({
  _links: z.object({
    html: z.object({
      href: z.string().url(),
    }),
    pull_request: z.object({
      href: z.string().url(),
    }),
    self: z.object({
      href: z.string().url(),
    }),
  }),
  author_association: z.enum(["COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", "OWNER"]).describe("How the author is associated with the repository."),
  body: z.string().describe("The text of the comment."),
  body_html: z.string().optional(),
  body_text: z.string().optional(),
  commit_id: z.string().describe("The SHA of the commit to which the comment applies."),
  created_at: z.string().datetime(),
  diff_hunk: z.string().describe("The diff of the line that the comment refers to."),
  html_url: z.string().url().describe("HTML URL for the pull request review comment."),
  id: z.number().int().describe("The ID of the pull request review comment."),
  in_reply_to_id: z.number().int().optional().describe("The comment ID to reply to."),
  line: z.number().int().optional().describe("The line of the blob to which the comment applies. The last line of the range for a multi-line comment"),
  node_id: z.string().describe("The node ID of the pull request review comment."),
  original_commit_id: z.string().describe("The SHA of the original commit to which the comment applies."),
  original_line: z.number().int().optional().describe("The line of the blob to which the comment applies. The last line of the range for a multi-line comment"),
  original_position: z.number().int().describe("The index of the original line in the diff to which the comment applies. This field is deprecated; use `original_line` instead."),
  original_start_line: z.number().int().nullable().optional().describe("The first line of the range for a multi-line comment."),
  path: z.string().describe("The relative path of the file to which the comment applies."),
  position: z.number().int().describe("The line index in the diff to which the comment applies. This field is deprecated; use `line` instead."),
  pull_request_review_id: z.number().int().nullable().describe("The ID of the pull request review to which the comment belongs."),
  pull_request_url: z.string().url().describe("URL for the pull request that the review comment belongs to."),
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
  side: z.enum(["LEFT", "RIGHT"]).optional().default("RIGHT").describe("The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment"),
  start_line: z.number().int().nullable().optional().describe("The first line of the range for a multi-line comment."),
  start_side: z.enum(["LEFT", "RIGHT"]).nullable().optional().default("RIGHT").describe("The side of the first line of the range for a multi-line comment."),
  updated_at: z.string().datetime(),
  url: z.string().describe("URL for the pull request review comment"),
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

export const pullsListReviewComments = pikkuSessionlessFunc({
  description: "Lists all review comments for a pull request. By default, review comments are in ascending order by ID.",
  input: PullsListReviewCommentsInput,
  output: PullsListReviewCommentsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/comments", data) as any
  },
})
