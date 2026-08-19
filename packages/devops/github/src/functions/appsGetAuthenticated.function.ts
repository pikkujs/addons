// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsGetAuthenticatedOutput = z.object({
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

export const appsGetAuthenticated = pikkuSessionlessFunc({
  description: "Returns the GitHub App associated with the authentication credentials used. To see how many app installations are associated with this GitHub App, see the `installations_count` in the response. For more details about your app's installations, see the \"[List installations for the authenticated app](https://docs.github.com/rest/reference/apps#list-installations-for-the-authenticated-app)\" endpoint.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  output: AppsGetAuthenticatedOutput,
  func: async ({ github }) => {
    return github.call("GET", "/app") as any
  },
})
