import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetPrecomputationsInput = z.object({
  functionKey: z.array(z.string()).optional(),
  startAt: z.number().int().optional().default(0),
  maxResults: z.number().int().optional().default(5000),
  orderBy: z.string().optional(),
  filter: z.string().optional(),
})

export const GetPrecomputationsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    arguments: z.array(z.string()).optional(),
    created: z.string().datetime().optional(),
    field: z.string().optional(),
    functionKey: z.string().optional(),
    functionName: z.string().optional(),
    id: z.string().optional(),
    operator: z.string().optional(),
    updated: z.string().datetime().optional(),
    used: z.string().datetime().optional(),
    value: z.string().optional(),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getPrecomputations = pikkuSessionlessFunc({
  input: GetPrecomputationsInput,
  output: GetPrecomputationsOutput,
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/jql/function/computation", data) as any
  },
})
