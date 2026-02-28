import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InsertManyInput = z.object({
  table: z.string().describe('The table to insert into'),
  data: z.array(z.record(z.string(), z.any())).describe('Array of rows to insert'),
  returning: z.array(z.string()).optional().describe('Columns to return after insert'),
})

export const InsertManyOutput = z.object({
  success: z.boolean().describe('Whether the insert was successful'),
  rowCount: z.number().describe('Number of rows inserted'),
  returning: z.array(z.record(z.string(), z.any())).optional().describe('Returned data'),
})

type Output = z.infer<typeof InsertManyOutput>

const escapeIdentifier = (identifier: string): string => {
  return '"' + identifier.replace(/"/g, '""') + '"'
}

export const insertMany = pikkuSessionlessFunc({
  description: 'Inserts multiple rows into a PostgreSQL table',
  node: { displayName: 'Insert Multiple Rows', category: 'Database', type: 'action' },
  input: InsertManyInput,
  output: InsertManyOutput,
  func: async ({ postgres }, { table, data, returning }) => {
    if (data.length === 0) {
      return {
        success: true,
        rowCount: 0,
      }
    }

    const columns = Object.keys(data[0])
    const values: unknown[] = []
    const valueSets: string[] = []

    data.forEach((row, rowIndex) => {
      const placeholders = columns.map((col, colIndex) => {
        values.push(row[col])
        return `$${rowIndex * columns.length + colIndex + 1}`
      })
      valueSets.push(`(${placeholders.join(', ')})`)
    })

    let query = `INSERT INTO ${escapeIdentifier(table)} (${columns.map(escapeIdentifier).join(', ')}) VALUES ${valueSets.join(', ')}`

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
