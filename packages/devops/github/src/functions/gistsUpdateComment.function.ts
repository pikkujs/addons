// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GistsUpdateCommentInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
  body: z.string().max(65535).describe("The comment text."),
})

export const GistsUpdateCommentOutput = z.object({
  author_association: z.enum(["COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", "OWNER"]).describe("How the author is associated with the repository."),
  body: z.string().max(65535).describe("The comment text."),
  created_at: z.string().datetime(),
  id: z.number().int(),
  node_id: z.string(),
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
}).describe("A comment made to a gist.")

export const gistsUpdateComment = pikkuSessionlessFunc({
  input: GistsUpdateCommentInput,
  output: GistsUpdateCommentOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/gists/{gist_id}/comments/{comment_id}", data) as any
  },
})
