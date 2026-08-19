// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateCommitCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  commit_sha: z.string().describe("The SHA of the commit."),
  body: z.string().describe("The contents of the comment."),
  line: z.number().int().optional().describe("**Deprecated**. Use **position** parameter instead. Line number in the file to comment on."),
  path: z.string().optional().describe("Relative path of the file to comment on."),
  position: z.number().int().optional().describe("Line index in the diff to comment on."),
})

export const ReposCreateCommitCommentOutput = z.object({
  author_association: z.enum(["COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", "OWNER"]).describe("How the author is associated with the repository."),
  body: z.string(),
  commit_id: z.string(),
  created_at: z.string().datetime(),
  html_url: z.string().url(),
  id: z.number().int(),
  line: z.number().int().nullable(),
  node_id: z.string(),
  path: z.string().nullable(),
  position: z.number().int().nullable(),
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
}).describe("Commit Comment")

export const reposCreateCommitComment = pikkuSessionlessFunc({
  description: "Create a comment for a commit using its `:commit_sha`.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: ReposCreateCommitCommentInput,
  output: ReposCreateCommitCommentOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/commits/{commit_sha}/comments", data) as any
  },
})
