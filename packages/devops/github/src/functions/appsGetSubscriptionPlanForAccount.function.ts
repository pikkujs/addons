// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AppsGetSubscriptionPlanForAccountInput = z.object({
  account_id: z.number().int().describe("account_id parameter"),
})

export const AppsGetSubscriptionPlanForAccountOutput = z.object({
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
}).describe("Marketplace Purchase")

export const appsGetSubscriptionPlanForAccount = pikkuSessionlessFunc({
  description: "Shows whether the user or organization account actively subscribes to a plan listed by the authenticated GitHub App. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change.\n\nGitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.",
  input: AppsGetSubscriptionPlanForAccountInput,
  output: AppsGetSubscriptionPlanForAccountOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/marketplace_listing/accounts/{account_id}", data) as any
  },
})
