import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const UpsertInput = z.object({
  table: z.string().describe('The table to upsert into'),
  data: z.record(z.string(), z.any()).describe('Data to insert/update as key-value pairs'),
  matchColumn: z.string().describe('The column to match on for updates (typically primary key)'),
})

export const UpsertOutput = z.object({
  insertId: z.number().describe('The auto-generated ID if a new row was inserted'),
  affectedRows: z.number().describe('Number of rows affected (1 for insert, 2 for update)'),
})

export const upsert = pikkuSessionlessFunc({
  description: 'Inserts a row or updates it if a duplicate key exists',
  node: { displayName: 'Upsert Row', category: 'Database', type: 'action' },
  input: UpsertInput,
  output: UpsertOutput,
  func: async ({ mysql }, { table, data, matchColumn }) => {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const escapedColumns = columns.map(escapeIdentifier).join(', ')
    const placeholders = columns.map(() => '?').join(', ')

    const updateColumns = columns.filter(col => col !== matchColumn)
    const updateClauses = updateColumns.map(col => `${escapeIdentifier(col)} = ?`).join(', ')
    const updateValues = updateColumns.map(col => data[col])

    const query = `INSERT INTO ${escapeIdentifier(table)} (${escapedColumns}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updateClauses}`
    const allValues = [...values, ...updateValues]

    const [result] = await mysql.execute(query, allValues)
    const res = result as { insertId: number | bigint; affectedRows: number }

    return {
      insertId: Number(res.insertId),
      affectedRows: res.affectedRows,
    }
  },
})
