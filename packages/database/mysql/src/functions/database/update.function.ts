import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, escapeIdentifier, buildWhereClause } from '../../shared.js'

export const UpdateInput = z.object({
  table: z.string().describe('The table to update'),
  data: z.record(z.string(), z.any()).describe('Data to update as key-value pairs'),
  where: WhereClause.describe('WHERE conditions with operators'),
  limit: z.number().optional().describe('Maximum number of rows to update'),
})

export const UpdateOutput = z.object({
  affectedRows: z.number().describe('Number of rows affected'),
  changedRows: z.number().describe('Number of rows actually changed'),
})

export const update = pikkuSessionlessFunc({
  description: 'Updates rows in a MySQL table with advanced filtering',
  node: { displayName: 'Update Rows', category: 'Database', type: 'action' },
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ mysql }, { table, data, where, limit }) => {
    const setColumns = Object.keys(data)
    const setValues = Object.values(data)
    const setClauses = setColumns.map(col => `${escapeIdentifier(col)} = ?`).join(', ')

    let query = `UPDATE ${escapeIdentifier(table)} SET ${setClauses}`
    const values: any[] = [...setValues]

    const { clause, values: whereValues } = buildWhereClause(where)

    if (!clause) {
      throw new Error('WHERE clause is required for UPDATE operations')
    }

    query += clause
    values.push(...whereValues)

    if (limit !== undefined) {
      query += ` LIMIT ${Math.floor(limit)}`
    }

    const [result] = await mysql.execute(query, values)
    const res = result as { affectedRows: number; changedRows?: number }

    return {
      affectedRows: res.affectedRows,
      changedRows: res.changedRows ?? res.affectedRows,
    }
  },
})
