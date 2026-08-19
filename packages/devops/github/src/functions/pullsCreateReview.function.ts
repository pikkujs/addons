// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsCreateReviewInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  body: z.string().optional().describe("**Required** when using `REQUEST_CHANGES` or `COMMENT` for the `event` parameter. The body text of the pull request review."),
  comments: z.array(z.object({
  body: z.string().describe("Text of the review comment."),
  line: z.number().int().optional(),
  path: z.string().describe("The relative path to the file that necessitates a review comment."),
  position: z.number().int().optional().describe("The position in the diff where you want to add a review comment. Note this value is not the same as the line number in the file. For help finding the position value, read the note below."),
  side: z.string().optional(),
  start_line: z.number().int().optional(),
  start_side: z.string().optional(),
})).optional().describe("Use the following table to specify the location, destination, and contents of the draft review comment."),
  commit_id: z.string().optional().describe("The SHA of the commit that needs a review. Not using the latest commit SHA may render your review comment outdated if a subsequent commit modifies the line you specify as the `position`. Defaults to the most recent commit in the pull request when you do not specify a value."),
  event: z.enum(["APPROVE", "REQUEST_CHANGES", "COMMENT"]).optional().describe("The review action you want to perform. The review actions include: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. By leaving this blank, you set the review action state to `PENDING`, which means you will need to [submit the pull request review](https://docs.github.com/rest/pulls#submit-a-review-for-a-pull-request) when you are ready."),
})

export const PullsCreateReviewOutput = z.object({
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
}).describe("Pull Request Reviews are reviews on pull requests.")

export const pullsCreateReview = pikkuSessionlessFunc({
  description: "This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.\n\nPull request reviews created in the `PENDING` state are not submitted and therefore do not include the `submitted_at` property in the response. To create a pending review for a pull request, leave the `event` parameter blank. For more information about submitting a `PENDING` review, see \"[Submit a review for a pull request](https://docs.github.com/rest/pulls#submit-a-review-for-a-pull-request).\"\n\n**Note:** To comment on a specific line in a file, you need to first determine the _position_ of that line in the diff. The GitHub REST API offers the `application/vnd.github.v3.diff` [media type](https://docs.github.com/rest/overview/media-types#commits-commit-comparison-and-pull-requests). To see a pull request diff, add this media type to the `Accept` header of a call to the [single pull request](https://docs.github.com/rest/reference/pulls#get-a-pull-request) endpoint.\n\nThe `position` value equals the number of lines down from the first \"@@\" hunk header in the file you want to add a comment. The line just below the \"@@\" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file.",
  input: PullsCreateReviewInput,
  output: PullsCreateReviewOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pulls/{pull_number}/reviews", data) as any
  },
})
