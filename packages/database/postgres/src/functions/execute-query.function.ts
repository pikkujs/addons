import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteQueryInput = z.object({
  query: z.string().describe('The SQL query to execute'),
  parameters: z.array(z.any()).optional().describe('Query parameters for prepared statements ($1, $2, etc.)'),
})

export const ExecuteQueryOutput = z.object({
  results: z.array(z.record(z.string(), z.any())).describe('Query results'),
  rowCount: z.number().optional().describe('Number of rows affected'),
})

type Output = z.infer<typeof ExecuteQueryOutput>

export const executeQuery = pikkuSessionlessFunc({
  description: 'Executes a raw SQL query on the PostgreSQL database',
  node: { displayName: 'Execute Query', category: 'Database', type: 'action' },
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ postgres }, { query, parameters }) => {
    const result = await postgres.query(query, parameters || [])

    return {
      results: result.rows,
      rowCount: result.rowCount ?? undefined,
    }
  },
})
