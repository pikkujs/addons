import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { WhereClause, OrderByClause, escapeIdentifier, buildWhereClause, buildOrderByClause } from '../shared.js'

export const SelectInput = z.object({
  table: z.string().describe('The table to select from'),
  columns: z.array(z.string()).optional().describe('Columns to select (defaults to all)'),
  distinct: z.boolean().optional().describe('Select distinct rows only'),
  where: WhereClause.optional().describe('WHERE conditions'),
  orderBy: z.array(OrderByClause).optional().describe('Columns to order by with directions'),
  limit: z.number().optional().describe('Maximum number of rows to return'),
  offset: z.number().optional().describe('Number of rows to skip'),
})

export const SelectOutput = z.object({
  results: z.array(z.record(z.string(), z.any())).describe('Selected rows'),
  count: z.number().describe('Number of rows returned'),
})

export const select = pikkuSessionlessFunc({
  description: 'Selects rows from a PostgreSQL table with advanced filtering',
  node: { displayName: 'Select Rows', category: 'Database', type: 'action' },
  input: SelectInput,
  output: SelectOutput,
  func: async ({ postgres }, { table, columns, distinct, where, orderBy, limit, offset }) => {
    const selectColumns = columns && columns.length > 0
      ? columns.map(escapeIdentifier).join(', ')
      : '*'

    const distinctClause = distinct ? 'DISTINCT ' : ''
    let query = `SELECT ${distinctClause}${selectColumns} FROM ${escapeIdentifier(table)}`

    const { clause, values, nextIndex } = buildWhereClause(where)
    query += clause
    query += buildOrderByClause(orderBy)
    let paramIndex = nextIndex

    if (limit !== undefined) {
      query += ` LIMIT $${paramIndex++}`
      values.push(limit)
    }

    if (offset !== undefined) {
      query += ` OFFSET $${paramIndex++}`
      values.push(offset)
    }

    const result = await postgres.query(query, values)

    return {
      results: result.rows,
      count: result.rows.length,
    }
  },
})
