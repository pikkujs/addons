// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AppsListPlansInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const AppsListPlansOutput = z.array(z.object({
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
}))

export const appsListPlans = pikkuSessionlessFunc({
  description: "Lists all plans that are part of your GitHub Marketplace listing.\n\nGitHub Apps must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint. OAuth Apps must use [basic authentication](https://docs.github.com/rest/overview/other-authentication-methods#basic-authentication) with their client ID and client secret to access this endpoint.",
  input: AppsListPlansInput,
  output: AppsListPlansOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/marketplace_listing/plans", data) as any
  },
})
