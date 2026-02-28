import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const DescribeTableInput = z.object({
  table: z.string().describe('The table to describe'),
})

export const ColumnInfo = z.object({
  field: z.string().describe('Column name'),
  type: z.string().describe('Column data type'),
  null: z.boolean().describe('Whether NULL values are allowed'),
  key: z.string().describe('Key type (PRI, UNI, MUL, or empty)'),
  default: z.any().nullable().describe('Default value'),
  extra: z.string().describe('Additional information (e.g., auto_increment)'),
})

export const DescribeTableOutput = z.object({
  columns: z.array(ColumnInfo).describe('Array of column information'),
  tableName: z.string().describe('The table name'),
})

export const describeTable = pikkuSessionlessFunc({
  description: 'Gets the schema/structure of a MySQL table',
  node: { displayName: 'Describe Table', category: 'Database', type: 'action' },
  input: DescribeTableInput,
  output: DescribeTableOutput,
  func: async ({ mysql }, { table }) => {
    const [rows] = await mysql.execute(`DESCRIBE ${escapeIdentifier(table)}`)
    const results = rows as Array<{
      Field: string
      Type: string
      Null: string
      Key: string
      Default: unknown
      Extra: string
    }>

    const columns = results.map((row) => ({
      field: row.Field,
      type: row.Type,
      null: row.Null === 'YES',
      key: row.Key,
      default: row.Default,
      extra: row.Extra,
    }))

    return {
      columns,
      tableName: table,
    }
  },
})
