// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsSubmitReviewInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  review_id: z.number().int().describe("The unique identifier of the review."),
  body: z.string().optional().describe("The body text of the pull request review"),
  event: z.enum(["APPROVE", "REQUEST_CHANGES", "COMMENT"]).describe("The review action you want to perform. The review actions include: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. When you leave this blank, the API returns _HTTP 422 (Unrecognizable entity)_ and sets the review action state to `PENDING`, which means you will need to re-submit the pull request review using a review action."),
})

export const PullsSubmitReviewOutput = z.object({
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

export const pullsSubmitReview = pikkuSessionlessFunc({
  description: "Submits a pending review for a pull request. For more information about creating a pending review for a pull request, see \"[Create a review for a pull request](https://docs.github.com/rest/pulls#create-a-review-for-a-pull-request).\"",
  input: PullsSubmitReviewInput,
  output: PullsSubmitReviewOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events", data) as any
  },
})
