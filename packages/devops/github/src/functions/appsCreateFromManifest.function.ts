// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const AppsCreateFromManifestInput = z.object({
  code: z.string(),
})

export const AppsCreateFromManifestOutput = z.object({
  client_id: z.string(),
  client_secret: z.string(),
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
  pem: z.string(),
  permissions: z.object({
    checks: z.string().optional(),
    contents: z.string().optional(),
    deployments: z.string().optional(),
    issues: z.string().optional(),
    metadata: z.string().optional(),
  }).describe("The set of permissions for the GitHub app"),
  slug: z.string().optional().describe("The slug name of the GitHub app"),
  updated_at: z.string().datetime(),
  webhook_secret: z.string().nullable(),
})

export const appsCreateFromManifest = pikkuSessionlessFunc({
  description: "Use this endpoint to complete the handshake necessary when implementing the [GitHub App Manifest flow](https://docs.github.com/apps/building-github-apps/creating-github-apps-from-a-manifest/). When you create a GitHub App with the manifest flow, you receive a temporary `code` used to retrieve the GitHub App's `id`, `pem` (private key), and `webhook_secret`.",
  input: AppsCreateFromManifestInput,
  output: AppsCreateFromManifestOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/app-manifests/{code}/conversions", data) as any
  },
})
