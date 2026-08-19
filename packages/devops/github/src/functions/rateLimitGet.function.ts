// rate-limit — Check your current rate limit status

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const RateLimitGetOutput = z.object({
  rate: z.object({
    limit: z.number().int(),
    remaining: z.number().int(),
    reset: z.number().int(),
    used: z.number().int(),
  }),
  resources: z.object({
    actions_runner_registration: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    code_scanning_upload: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    core: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }),
    dependency_snapshots: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    graphql: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    integration_manifest: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    scim: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
    search: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }),
    source_import: z.object({
      limit: z.number().int(),
      remaining: z.number().int(),
      reset: z.number().int(),
      used: z.number().int(),
    }).optional(),
  }),
}).describe("Rate Limit Overview")

export const rateLimitGet = pikkuSessionlessFunc({
  description: "**Note:** Accessing this endpoint does not count against your REST API rate limit.\n\n**Note:** The `rate` object is deprecated. If you're writing new API client code or updating existing code, you should use the `core` object instead of the `rate` object. The `core` object contains the same information that is present in the `rate` object.",
  output: RateLimitGetOutput,
  errors: [NotFoundError],
  func: async ({ github }) => {
    return github.call("GET", "/rate_limit") as any
  },
})
