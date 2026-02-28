import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTablesInput = z.object({
  schema: z.string().optional().default('public').describe('Schema name (defaults to public)'),
  pattern: z.string().optional().describe('Optional LIKE pattern to filter table names (e.g., "user%")'),
})

export const ListTablesOutput = z.object({
  tables: z.array(z.string()).describe('Array of table names'),
  count: z.number().describe('Number of tables found'),
})

export const listTables = pikkuSessionlessFunc({
  description: 'Lists all tables in the PostgreSQL database',
  node: { displayName: 'List Tables', category: 'Database', type: 'action' },
  input: ListTablesInput,
  output: ListTablesOutput,
  func: async ({ postgres }, { schema, pattern }) => {
    let query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = $1 AND table_type = 'BASE TABLE'
    `
    const values: string[] = [schema ?? 'public']

    if (pattern) {
      query += ' AND table_name LIKE $2'
      values.push(pattern)
    }

    query += ' ORDER BY table_name'

    const result = await postgres.query(query, values)

    const tables = result.rows.map((row: Record<string, string>) => row.table_name)

    return {
      tables,
      count: tables.length,
    }
  },
})
