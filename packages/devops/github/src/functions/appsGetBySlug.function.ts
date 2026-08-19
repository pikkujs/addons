// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AppsGetBySlugInput = z.object({
  app_slug: z.string(),
})

export const AppsGetBySlugOutput = z.object({
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  events: z.array(z.string()).describe("The list of events for the GitHub app"),
  external_url: z.string().url(),
  html_url: z.string().url(),
  id: z.number().int().describe("Unique identifier of the GitHub app"),
  installations_count: z.number().int().optional().describe("The number of installations associated with the GitHub app"),
  name: z.string().describe("The name of the GitHub app"),
  node_id: z.string(),
  owner: z.object({
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
  pem: z.string().optional(),
  permissions: z.object({
    checks: z.string().optional(),
    contents: z.string().optional(),
    deployments: z.string().optional(),
    issues: z.string().optional(),
    metadata: z.string().optional(),
  }).describe("The set of permissions for the GitHub app"),
  slug: z.string().optional().describe("The slug name of the GitHub app"),
  updated_at: z.string().datetime(),
  webhook_secret: z.string().nullable().optional(),
}).describe("GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.")

export const appsGetBySlug = pikkuSessionlessFunc({
  description: "**Note**: The `:app_slug` is just the URL-friendly name of your GitHub App. You can find this on the settings page for your GitHub App (e.g., `https://github.com/settings/apps/:app_slug`).\n\nIf the GitHub App you specify is public, you can access this endpoint without authenticating. If the GitHub App you specify is private, you must authenticate with a [personal access token](https://docs.github.com/articles/creating-a-personal-access-token-for-the-command-line/) or an [installation access token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation) to access this endpoint.",
  input: AppsGetBySlugInput,
  output: AppsGetBySlugOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/apps/{app_slug}", data) as any
  },
})
