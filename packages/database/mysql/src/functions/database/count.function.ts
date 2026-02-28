import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, escapeIdentifier, buildWhereClause } from '../../shared.js'

export const CountInput = z.object({
  table: z.string().describe('The table to count rows from'),
  where: WhereClause.optional().describe('WHERE conditions'),
  column: z.string().optional().describe('Column to count (defaults to *)'),
  distinct: z.boolean().optional().describe('Count distinct values only'),
})

export const CountOutput = z.object({
  count: z.number().describe('Number of rows matching the conditions'),
})

export const count = pikkuSessionlessFunc({
  description: 'Counts rows in a MySQL table with optional filtering',
  node: { displayName: 'Count Rows', category: 'Database', type: 'action' },
  input: CountInput,
  output: CountOutput,
  func: async ({ mysql }, { table, where, column, distinct }) => {
    const countExpr = column
      ? distinct
        ? `COUNT(DISTINCT ${escapeIdentifier(column)})`
        : `COUNT(${escapeIdentifier(column)})`
      : 'COUNT(*)'

    let query = `SELECT ${countExpr} as count FROM ${escapeIdentifier(table)}`
    const { clause, values } = buildWhereClause(where)
    query += clause

    const [rows] = await mysql.execute(query, values)
    const result = (rows as Record<string, unknown>[])[0]

    return {
      count: Number(result.count),
    }
  },
})
