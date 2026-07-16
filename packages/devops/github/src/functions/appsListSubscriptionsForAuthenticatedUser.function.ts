// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AppsListSubscriptionsForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const AppsListSubscriptionsForAuthenticatedUserOutput = z.array(z.object({
  account: z.object({
    email: z.string().email().nullable().optional(),
    id: z.number().int(),
    login: z.string(),
    node_id: z.string().optional(),
    organization_billing_email: z.string().email().nullable().optional(),
    type: z.string(),
    url: z.string().url(),
  }),
  billing_cycle: z.string(),
  free_trial_ends_on: z.string().datetime().nullable(),
  next_billing_date: z.string().datetime().nullable(),
  on_free_trial: z.boolean(),
  plan: z.object({
    accounts_url: z.string().url(),
    bullets: z.array(z.string()),
    description: z.string(),
    has_free_trial: z.boolean(),
    id: z.number().int(),
    monthly_price_in_cents: z.number().int(),
    name: z.string(),
    number: z.number().int(),
    price_model: z.enum(["FREE", "FLAT_RATE", "PER_UNIT"]),
    state: z.string(),
    unit_name: z.string().nullable(),
    url: z.string().url(),
    yearly_price_in_cents: z.number().int(),
  }).describe("Marketplace Listing Plan"),
  unit_count: z.number().int().nullable(),
  updated_at: z.string().datetime().nullable(),
}))

export const appsListSubscriptionsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the active subscriptions for the authenticated user. You must use a [user-to-server OAuth access token](https://docs.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#identifying-users-on-your-site), created for a user who has authorized your GitHub App, to access this endpoint. . OAuth Apps must authenticate using an [OAuth token](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/).",
  input: AppsListSubscriptionsForAuthenticatedUserInput,
  output: AppsListSubscriptionsForAuthenticatedUserOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/marketplace_purchases", data) as any
  },
})
