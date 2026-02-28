import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, escapeIdentifier, buildWhereClause } from '../shared.js'

export const DeleteInput = z.object({
  table: z.string().describe('The table to delete from'),
  where: WhereClause.describe('WHERE conditions'),
  returning: z.array(z.string()).optional().describe('Columns to return after delete'),
})

export const DeleteOutput = z.object({
  success: z.boolean().describe('Whether the delete was successful'),
  rowCount: z.number().describe('Number of rows deleted'),
  returning: z.array(z.record(z.string(), z.any())).optional().describe('Returned data'),
})

export const deleteRows = pikkuSessionlessFunc({
  description: 'Deletes rows from a PostgreSQL table',
  node: { displayName: 'Delete Rows', category: 'Database', type: 'action' },
  input: DeleteInput,
  output: DeleteOutput,
  func: async ({ postgres }, { table, where, returning }) => {
    const { clause, values } = buildWhereClause(where)

    let query = `DELETE FROM ${escapeIdentifier(table)}${clause}`

    if (returning && returning.length > 0) {
      query += ` RETURNING ${returning.map(escapeIdentifier).join(', ')}`
    }

    const result = await postgres.query(query, values)

    return {
      success: true,
      rowCount: result.rowCount ?? 0,
      returning: result.rows.length > 0 ? result.rows : undefined,
    }
  },
})
