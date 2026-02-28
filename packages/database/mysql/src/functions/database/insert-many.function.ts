import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const InsertManyInput = z.object({
  table: z.string().describe('The table to insert into'),
  data: z.array(z.record(z.string(), z.any())).describe('Array of rows to insert'),
  ignoreDuplicates: z.boolean().optional().describe('Use INSERT IGNORE to skip duplicate key errors'),
  priority: z.enum(['LOW', 'HIGH']).optional().describe('Insert priority (LOW_PRIORITY or HIGH_PRIORITY)'),
})

export const InsertManyOutput = z.object({
  insertId: z.number().describe('The auto-generated ID of the first inserted row'),
  affectedRows: z.number().describe('Number of rows affected'),
})

export const insertMany = pikkuSessionlessFunc({
  description: 'Inserts multiple rows into a MySQL table',
  node: { displayName: 'Insert Many Rows', category: 'Database', type: 'action' },
  input: InsertManyInput,
  output: InsertManyOutput,
  func: async ({ mysql }, { table, data, ignoreDuplicates, priority }) => {
    if (data.length === 0) {
      return { insertId: 0, affectedRows: 0 }
    }

    const columns = [...new Set(data.flatMap(Object.keys))]
    const escapedColumns = columns.map(escapeIdentifier).join(', ')
    const placeholderRow = `(${columns.map(() => '?').join(', ')})`
    const placeholders = data.map(() => placeholderRow).join(', ')

    const values = data.flatMap(row => columns.map(col => row[col] ?? null))

    let insertModifier = ''
    if (priority === 'LOW') {
      insertModifier = 'LOW_PRIORITY '
    } else if (priority === 'HIGH') {
      insertModifier = 'HIGH_PRIORITY '
    }

    const ignore = ignoreDuplicates ? 'IGNORE ' : ''
    const query = `INSERT ${insertModifier}${ignore}INTO ${escapeIdentifier(table)} (${escapedColumns}) VALUES ${placeholders}`

    const [result] = await mysql.execute(query, values)
    const res = result as { insertId: number | bigint; affectedRows: number }

    return {
      insertId: Number(res.insertId),
      affectedRows: res.affectedRows,
    }
  },
})
