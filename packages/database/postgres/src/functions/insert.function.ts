import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../shared.js'

export const InsertInput = z.object({
  table: z.string().describe('The table to insert into'),
  data: z.record(z.string(), z.any()).describe('Data to insert as key-value pairs'),
  returning: z.array(z.string()).optional().describe('Columns to return after insert'),
  skipOnConflict: z.boolean().optional().describe('When true, skip insert on conflict (ON CONFLICT DO NOTHING)'),
})

export const InsertOutput = z.object({
  success: z.boolean().describe('Whether the insert was successful'),
  rowCount: z.number().describe('Number of rows inserted'),
  returning: z.array(z.record(z.string(), z.any())).optional().describe('Returned data'),
})

export const insert = pikkuSessionlessFunc({
  description: 'Inserts a row into a PostgreSQL table',
  node: { displayName: 'Insert Row', category: 'Database', type: 'action' },
  input: InsertInput,
  output: InsertOutput,
  func: async ({ postgres }, { table, data, returning, skipOnConflict }) => {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map((_, i) => `$${i + 1}`)

    let query = `INSERT INTO ${escapeIdentifier(table)} (${columns.map(escapeIdentifier).join(', ')}) VALUES (${placeholders.join(', ')})`

    if (skipOnConflict) {
      query += ' ON CONFLICT DO NOTHING'
    }

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
