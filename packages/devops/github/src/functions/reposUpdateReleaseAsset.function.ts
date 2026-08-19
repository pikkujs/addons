// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposUpdateReleaseAssetInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  asset_id: z.number().int().describe("The unique identifier of the asset."),
  label: z.string().optional().describe("An alternate short description of the asset. Used in place of the filename."),
  name: z.string().optional().describe("The file name of the asset."),
  state: z.string().optional(),
})

export const ReposUpdateReleaseAssetOutput = z.object({
  browser_download_url: z.string().url(),
  content_type: z.string(),
  created_at: z.string().datetime(),
  download_count: z.number().int(),
  id: z.number().int(),
  label: z.string().nullable(),
  name: z.string().describe("The file name of the asset."),
  node_id: z.string(),
  size: z.number().int(),
  state: z.enum(["uploaded", "open"]).describe("State of the release asset."),
  updated_at: z.string().datetime(),
  uploader: z.object({
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
  url: z.string().url(),
}).describe("Data related to a release.")

export const reposUpdateReleaseAsset = pikkuSessionlessFunc({
  description: "Users with push access to the repository can edit a release asset.",
  input: ReposUpdateReleaseAssetInput,
  output: ReposUpdateReleaseAssetOutput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/releases/assets/{asset_id}", data) as any
  },
})
