// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsCreateReviewCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  body: z.string().describe("The text of the review comment."),
  commit_id: z.string().describe("The SHA of the commit needing a comment. Not using the latest commit SHA may render your comment outdated if a subsequent commit modifies the line you specify as the `position`."),
  in_reply_to: z.number().int().optional().describe("The ID of the review comment to reply to. To find the ID of a review comment with [\"List review comments on a pull request\"](#list-review-comments-on-a-pull-request). When specified, all parameters other than `body` in the request body are ignored."),
  line: z.number().int().describe("The line of the blob in the pull request diff that the comment applies to. For a multi-line comment, the last line of the range that your comment applies to."),
  path: z.string().describe("The relative path to the file that necessitates a comment."),
  position: z.number().int().optional().describe("**This parameter is deprecated. Use `line` instead**. The position in the diff where you want to add a review comment. Note this value is not the same as the line number in the file. For help finding the position value, read the note above."),
  side: z.enum(["LEFT", "RIGHT"]).optional().describe("In a split diff view, the side of the diff that the pull request's changes appear on. Can be `LEFT` or `RIGHT`. Use `LEFT` for deletions that appear in red. Use `RIGHT` for additions that appear in green or unchanged lines that appear in white and are shown for context. For a multi-line comment, side represents whether the last line of the comment range is a deletion or addition. For more information, see \"[Diff view options](https://docs.github.com/articles/about-comparing-branches-in-pull-requests#diff-view-options)\" in the GitHub Help documentation."),
  start_line: z.number().int().optional().describe("**Required when using multi-line comments unless using `in_reply_to`**. The `start_line` is the first line in the pull request diff that your multi-line comment applies to. To learn more about multi-line comments, see \"[Commenting on a pull request](https://docs.github.com/articles/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)\" in the GitHub Help documentation."),
  start_side: z.enum(["LEFT", "RIGHT", "side"]).optional().describe("**Required when using multi-line comments unless using `in_reply_to`**. The `start_side` is the starting side of the diff that the comment applies to. Can be `LEFT` or `RIGHT`. To learn more about multi-line comments, see \"[Commenting on a pull request](https://docs.github.com/articles/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)\" in the GitHub Help documentation. See `side` in this table for additional context."),
})

export const PullsCreateReviewCommentOutput = z.object({
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
}).describe("Pull Request Review Comments are comments on a portion of the Pull Request's diff.")

export const pullsCreateReviewComment = pikkuSessionlessFunc({
  description: "Creates a review comment in the pull request diff. To add a regular comment to a pull request timeline, see \"[Create an issue comment](https://docs.github.com/rest/reference/issues#create-an-issue-comment).\" We recommend creating a review comment using `line`, `side`, and optionally `start_line` and `start_side` if your comment applies to more than one line in the pull request diff.\n\nThe `position` parameter is deprecated. If you use `position`, the `line`, `side`, `start_line`, and `start_side` parameters are not required.\n\n**Note:** The position value equals the number of lines down from the first \"@@\" hunk header in the file you want to add a comment. The line just below the \"@@\" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: PullsCreateReviewCommentInput,
  output: PullsCreateReviewCommentOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pulls/{pull_number}/comments", data) as any
  },
})
