// meta — Endpoints that give information about the API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MetaRootOutput = z.object({
  authorizations_url: z.string(),
  code_search_url: z.string(),
  commit_search_url: z.string(),
  current_user_authorizations_html_url: z.string(),
  current_user_repositories_url: z.string(),
  current_user_url: z.string(),
  emails_url: z.string(),
  emojis_url: z.string(),
  events_url: z.string(),
  feeds_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  hub_url: z.string(),
  issue_search_url: z.string(),
  issues_url: z.string(),
  keys_url: z.string(),
  label_search_url: z.string(),
  notifications_url: z.string(),
  organization_repositories_url: z.string(),
  organization_teams_url: z.string(),
  organization_url: z.string(),
  public_gists_url: z.string(),
  rate_limit_url: z.string(),
  repository_search_url: z.string(),
  repository_url: z.string(),
  starred_gists_url: z.string(),
  starred_url: z.string(),
  topic_search_url: z.string().optional(),
  user_organizations_url: z.string(),
  user_repositories_url: z.string(),
  user_search_url: z.string(),
  user_url: z.string(),
})

export const metaRoot = pikkuSessionlessFunc({
  description: "Get Hypermedia links to resources accessible in GitHub's REST API",
  output: MetaRootOutput,
  func: async ({ github }) => {
    return github.call("GET", "/") as any
  },
})
