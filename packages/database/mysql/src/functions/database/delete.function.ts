import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, escapeIdentifier, buildWhereClause } from '../../shared.js'

export const DeleteInput = z.object({
  table: z.string().describe('The table to delete from'),
  where: WhereClause.describe('WHERE conditions with operators'),
  limit: z.number().optional().describe('Maximum number of rows to delete'),
})

export const DeleteOutput = z.object({
  affectedRows: z.number().describe('Number of rows deleted'),
})

export const deleteRows = pikkuSessionlessFunc({
  description: 'Deletes rows from a MySQL table with advanced filtering',
  node: { displayName: 'Delete Rows', category: 'Database', type: 'action' },
  input: DeleteInput,
  output: DeleteOutput,
  func: async ({ mysql }, { table, where, limit }) => {
    let query = `DELETE FROM ${escapeIdentifier(table)}`

    const { clause, values } = buildWhereClause(where)

    if (!clause) {
      throw new Error('WHERE clause is required for DELETE operations. Use truncate to remove all rows.')
    }

    query += clause

    if (limit !== undefined) {
      query += ` LIMIT ${Math.floor(limit)}`
    }

    const [result] = await mysql.execute(query, values)
    const res = result as { affectedRows: number }

    return {
      affectedRows: res.affectedRows,
    }
  },
})
