import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteQueryInput = z.object({
  query: z.string().describe('The SQL query to execute'),
  parameters: z.array(z.any()).optional().describe('Query parameters for prepared statements'),
})

export const ExecuteQueryOutput = z.object({
  results: z.array(z.record(z.string(), z.any())).describe('Query results'),
  affectedRows: z.number().optional().describe('Number of affected rows for INSERT/UPDATE/DELETE'),
  insertId: z.number().optional().describe('The insert ID for INSERT queries'),
})

export const executeQuery = pikkuSessionlessFunc({
  description: 'Executes a raw SQL query on the MySQL database',
  node: { displayName: 'Execute Query', category: 'Database', type: 'action' },
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ mysql }, { query, parameters }) => {
    const [rows] = await mysql.execute(query, parameters || [])

    if (Array.isArray(rows)) {
      return {
        results: rows as Record<string, unknown>[],
      }
    }

    const result = rows as { affectedRows?: number; insertId?: number }
    return {
      results: [],
      affectedRows: result.affectedRows,
      insertId: result.insertId ? Number(result.insertId) : undefined,
    }
  },
})
