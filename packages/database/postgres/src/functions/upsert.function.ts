import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpsertInput = z.object({
  table: z.string().describe('The table to upsert into'),
  data: z.record(z.string(), z.any()).describe('Data to upsert as key-value pairs'),
  conflictColumns: z.array(z.string()).describe('Columns to check for conflicts (unique constraint)'),
  updateColumns: z.array(z.string()).optional().describe('Columns to update on conflict (defaults to all non-conflict columns)'),
  returning: z.array(z.string()).optional().describe('Columns to return after upsert'),
})

export const UpsertOutput = z.object({
  success: z.boolean().describe('Whether the upsert was successful'),
  rowCount: z.number().describe('Number of rows affected'),
  returning: z.array(z.record(z.string(), z.any())).optional().describe('Returned data'),
})

type Output = z.infer<typeof UpsertOutput>

const escapeIdentifier = (identifier: string): string => {
  return '"' + identifier.replace(/"/g, '""') + '"'
}

export const upsert = pikkuSessionlessFunc({
  description: 'Inserts a row or updates it if it already exists (ON CONFLICT)',
  node: { displayName: 'Upsert Row', category: 'Database', type: 'action' },
  input: UpsertInput,
  output: UpsertOutput,
  func: async ({ postgres }, { table, data, conflictColumns, updateColumns, returning }) => {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map((_, i) => `$${i + 1}`)

    const columnsToUpdate = updateColumns || columns.filter(col => !conflictColumns.includes(col))

    let query = `INSERT INTO ${escapeIdentifier(table)} (${columns.map(escapeIdentifier).join(', ')}) VALUES (${placeholders.join(', ')})`
    query += ` ON CONFLICT (${conflictColumns.map(escapeIdentifier).join(', ')})`

    if (columnsToUpdate.length > 0) {
      const updateClause = columnsToUpdate.map(col => {
        return `${escapeIdentifier(col)} = EXCLUDED.${escapeIdentifier(col)}`
      }).join(', ')
      query += ` DO UPDATE SET ${updateClause}`
    } else {
      query += ` DO NOTHING`
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
