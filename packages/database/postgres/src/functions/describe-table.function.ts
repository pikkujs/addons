import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DescribeTableInput = z.object({
  table: z.string().describe('The table to describe'),
  schema: z.string().optional().default('public').describe('Schema name (defaults to public)'),
})

export const ColumnInfo = z.object({
  field: z.string().describe('Column name'),
  type: z.string().describe('Column data type'),
  null: z.boolean().describe('Whether NULL values are allowed'),
  key: z.string().describe('Key type (PRI, UNI, or empty)'),
  default: z.any().nullable().describe('Default value'),
  extra: z.string().describe('Additional information'),
})

export const DescribeTableOutput = z.object({
  columns: z.array(ColumnInfo).describe('Array of column information'),
  tableName: z.string().describe('The table name'),
})

export const describeTable = pikkuSessionlessFunc({
  description: 'Gets the schema/structure of a PostgreSQL table',
  node: { displayName: 'Describe Table', category: 'Database', type: 'action' },
  input: DescribeTableInput,
  output: DescribeTableOutput,
  func: async ({ postgres }, { table, schema }) => {
    const query = `
      SELECT
        c.column_name as field,
        c.data_type as type,
        c.is_nullable = 'YES' as nullable,
        c.column_default as default_value,
        CASE
          WHEN pk.constraint_type = 'PRIMARY KEY' THEN 'PRI'
          WHEN uk.constraint_type = 'UNIQUE' THEN 'UNI'
          ELSE ''
        END as key,
        CASE
          WHEN c.column_default LIKE 'nextval%' THEN 'auto_increment'
          ELSE ''
        END as extra
      FROM information_schema.columns c
      LEFT JOIN (
        SELECT kcu.column_name, tc.constraint_type
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = $1 AND tc.table_schema = $2 AND tc.constraint_type = 'PRIMARY KEY'
      ) pk ON c.column_name = pk.column_name
      LEFT JOIN (
        SELECT kcu.column_name, tc.constraint_type
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = $1 AND tc.table_schema = $2 AND tc.constraint_type = 'UNIQUE'
      ) uk ON c.column_name = uk.column_name
      WHERE c.table_name = $1 AND c.table_schema = $2
      ORDER BY c.ordinal_position
    `

    const result = await postgres.query(query, [table, schema ?? 'public'])

    const columns = result.rows.map((row: Record<string, unknown>) => ({
      field: row.field as string,
      type: row.type as string,
      null: row.nullable as boolean,
      key: row.key as string,
      default: row.default_value,
      extra: row.extra as string,
    }))

    return {
      columns,
      tableName: table,
    }
  },
})
