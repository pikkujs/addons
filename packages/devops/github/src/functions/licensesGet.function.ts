// licenses — View various OSS licenses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const LicensesGetInput = z.object({
  license: z.string(),
})

export const LicensesGetOutput = z.object({
  body: z.string(),
  conditions: z.array(z.string()),
  description: z.string(),
  featured: z.boolean(),
  html_url: z.string().url(),
  implementation: z.string(),
  key: z.string(),
  limitations: z.array(z.string()),
  name: z.string(),
  node_id: z.string(),
  permissions: z.array(z.string()),
  spdx_id: z.string().nullable(),
  url: z.string().url().nullable(),
}).describe("License")

export const licensesGet = pikkuSessionlessFunc({
  input: LicensesGetInput,
  output: LicensesGetOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/licenses/{license}", data) as any
  },
})
