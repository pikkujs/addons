import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const InsertInput = z.object({
  table: z.string().describe('The table to insert into'),
  data: z.record(z.string(), z.any()).describe('Data to insert as key-value pairs'),
  ignoreDuplicates: z.boolean().optional().describe('Use INSERT IGNORE to skip duplicate key errors'),
  priority: z.enum(['LOW', 'HIGH']).optional().describe('Insert priority (LOW_PRIORITY or HIGH_PRIORITY)'),
})

export const InsertOutput = z.object({
  insertId: z.number().describe('The auto-generated ID of the inserted row'),
  affectedRows: z.number().describe('Number of rows affected'),
})

export const insert = pikkuSessionlessFunc({
  description: 'Inserts a row into a MySQL table',
  node: { displayName: 'Insert Row', category: 'Database', type: 'action' },
  input: InsertInput,
  output: InsertOutput,
  func: async ({ mysql }, { table, data, ignoreDuplicates, priority }) => {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map(() => '?').join(', ')
    const escapedColumns = columns.map(escapeIdentifier).join(', ')

    let insertModifier = ''
    if (priority === 'LOW') {
      insertModifier = 'LOW_PRIORITY '
    } else if (priority === 'HIGH') {
      insertModifier = 'HIGH_PRIORITY '
    }

    const ignore = ignoreDuplicates ? 'IGNORE ' : ''
    const query = `INSERT ${insertModifier}${ignore}INTO ${escapeIdentifier(table)} (${escapedColumns}) VALUES (${placeholders})`

    const [result] = await mysql.execute(query, values)
    const res = result as { insertId: number | bigint; affectedRows: number }

    return {
      insertId: Number(res.insertId),
      affectedRows: res.affectedRows,
    }
  },
})
