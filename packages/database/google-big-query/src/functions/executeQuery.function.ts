import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteQueryInput = z.object({
  projectId: z.string(),
  query: z.string().optional(),
  useLegacySql: z.boolean().optional(),
  maxResults: z.number().int().optional(),
})

export const ExecuteQueryOutput = z.object({
  jobComplete: z.boolean().optional(),
})

export const executeQuery = pikkuSessionlessFunc({
  description: "Execute a SQL query",
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ googleBigQuery }, data) => {
    return googleBigQuery.call("POST", "/v2/projects/{projectId}/queries", data) as any
  },
})
