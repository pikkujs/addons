// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersUpdateAuthenticatedInput = z.object({
  bio: z.string().optional().describe("The new short biography of the user."),
  blog: z.string().optional().describe("The new blog URL of the user."),
  company: z.string().optional().describe("The new company of the user."),
  email: z.string().optional().describe("The publicly visible email address of the user."),
  hireable: z.boolean().optional().describe("The new hiring availability of the user."),
  location: z.string().optional().describe("The new location of the user."),
  name: z.string().optional().describe("The new name of the user."),
  twitter_username: z.string().nullable().optional().describe("The new Twitter username of the user."),
})

export const UsersUpdateAuthenticatedOutput = z.object({
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  blog: z.string().nullable(),
  business_plus: z.boolean().optional(),
  collaborators: z.number().int(),
  company: z.string().nullable(),
  created_at: z.string().datetime(),
  disk_usage: z.number().int(),
  email: z.string().email().nullable(),
  events_url: z.string(),
  followers: z.number().int(),
  followers_url: z.string().url(),
  following: z.number().int(),
  following_url: z.string(),
  gists_url: z.string(),
  gravatar_id: z.string().nullable(),
  hireable: z.boolean().nullable(),
  html_url: z.string().url(),
  id: z.number().int(),
  ldap_dn: z.string().optional(),
  location: z.string().nullable(),
  login: z.string(),
  name: z.string().nullable(),
  node_id: z.string(),
  organizations_url: z.string().url(),
  owned_private_repos: z.number().int(),
  plan: z.object({
    collaborators: z.number().int(),
    name: z.string(),
    private_repos: z.number().int(),
    space: z.number().int(),
  }).optional(),
  private_gists: z.number().int(),
  public_gists: z.number().int(),
  public_repos: z.number().int(),
  received_events_url: z.string().url(),
  repos_url: z.string().url(),
  site_admin: z.boolean(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  suspended_at: z.string().datetime().nullable().optional(),
  total_private_repos: z.number().int(),
  twitter_username: z.string().nullable().optional(),
  two_factor_authentication: z.boolean(),
  type: z.string(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Private User")

export const usersUpdateAuthenticated = pikkuSessionlessFunc({
  description: "**Note:** If your email is set to private and you send an `email` parameter as part of this request to update your profile, your privacy settings are still enforced: the email address will not be displayed on your public profile or via the API.",
  input: UsersUpdateAuthenticatedInput,
  output: UsersUpdateAuthenticatedOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/user", data) as any
  },
})
