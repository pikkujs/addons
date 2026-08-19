// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetCollaboratorPermissionLevelInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const ReposGetCollaboratorPermissionLevelOutput = z.object({
  permission: z.string(),
  role_name: z.string(),
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
    permissions: z.object({
      admin: z.boolean(),
      maintain: z.boolean().optional(),
      pull: z.boolean(),
      push: z.boolean(),
      triage: z.boolean().optional(),
    }).optional(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    role_name: z.string(),
    site_admin: z.boolean(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).nullable().describe("Collaborator"),
}).describe("Repository Collaborator Permission")

export const reposGetCollaboratorPermissionLevel = pikkuSessionlessFunc({
  description: "Checks the repository permission of a collaborator. The possible repository permissions are `admin`, `write`, `read`, and `none`.",
  input: ReposGetCollaboratorPermissionLevelInput,
  output: ReposGetCollaboratorPermissionLevelOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/collaborators/{username}/permission", data) as any
  },
})
