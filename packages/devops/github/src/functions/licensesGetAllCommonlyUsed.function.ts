// licenses — View various OSS licenses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LicensesGetAllCommonlyUsedInput = z.object({
  featured: z.boolean().optional(),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const LicensesGetAllCommonlyUsedOutput = z.array(z.object({
  html_url: z.string().url().optional(),
  key: z.string(),
  name: z.string(),
  node_id: z.string(),
  spdx_id: z.string().nullable(),
  url: z.string().url().nullable(),
}))

export const licensesGetAllCommonlyUsed = pikkuSessionlessFunc({
  input: LicensesGetAllCommonlyUsedInput,
  output: LicensesGetAllCommonlyUsedOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/licenses", data) as any
  },
})
