// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const AppsListAccountsForPlanInput = z.object({
  plan_id: z.number().int().describe("The unique identifier of the plan."),
  sort: z.enum(["created", "updated"]).optional().default("created").describe("The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to."),
  direction: z.enum(["asc", "desc"]).optional().describe("To return the oldest accounts first, set to `asc`. Ignored without the `sort` parameter."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const AppsListAccountsForPlanOutput = z.array(z.object({
  email: z.string().nullable().optional(),
  id: z.number().int(),
  login: z.string(),
  marketplace_pending_change: z.object({
    effective_date: z.string().optional(),
    id: z.number().int().optional(),
    is_installed: z.boolean().optional(),
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
    }).optional().describe("Marketplace Listing Plan"),
    unit_count: z.number().int().nullable().optional(),
  }).nullable().optional(),
  marketplace_purchase: z.object({
    billing_cycle: z.string().optional(),
    free_trial_ends_on: z.string().nullable().optional(),
    is_installed: z.boolean().optional(),
    next_billing_date: z.string().nullable().optional(),
    on_free_trial: z.boolean().optional(),
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
    }).optional().describe("Marketplace Listing Plan"),
    unit_count: z.number().int().nullable().optional(),
    updated_at: z.string().optional(),
  }),
  organization_billing_email: z.string().optional(),
  type: z.string(),
  url: z.string(),
}))

export const appsListAccountsForPlan = pikkuSessionlessFunc({
  description: "Returns user and organization accounts associated with the specified plan, including free plans. For per-seat pricing, you see the list of accounts that have purchased the plan, including the number of seats purchased. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change.\n\nGitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.",
  input: AppsListAccountsForPlanInput,
  output: AppsListAccountsForPlanOutput,
  errors: [UnauthorizedError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/marketplace_listing/plans/{plan_id}/accounts", data) as any
  },
})
