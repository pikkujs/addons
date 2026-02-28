import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, escapeIdentifier, buildWhereClause } from '../shared.js'

export const UpdateInput = z.object({
  table: z.string().describe('The table to update'),
  data: z.record(z.string(), z.any()).describe('Data to update as key-value pairs'),
  where: WhereClause.describe('WHERE conditions'),
  returning: z.array(z.string()).optional().describe('Columns to return after update'),
})

export const UpdateOutput = z.object({
  success: z.boolean().describe('Whether the update was successful'),
  rowCount: z.number().describe('Number of rows updated'),
  returning: z.array(z.record(z.string(), z.any())).optional().describe('Returned data'),
})

export const update = pikkuSessionlessFunc({
  description: 'Updates rows in a PostgreSQL table',
  node: { displayName: 'Update Rows', category: 'Database', type: 'action' },
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ postgres }, { table, data, where, returning }) => {
    const values: unknown[] = []
    let paramIndex = 1

    const setClause = Object.entries(data).map(([key, value]) => {
      values.push(value)
      return `${escapeIdentifier(key)} = $${paramIndex++}`
    }).join(', ')

    const { clause, values: whereValues } = buildWhereClause(where, paramIndex)
    values.push(...whereValues)

    let query = `UPDATE ${escapeIdentifier(table)} SET ${setClause}${clause}`

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
