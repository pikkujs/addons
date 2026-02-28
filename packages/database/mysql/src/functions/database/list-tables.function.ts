import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTablesInput = z.object({
  pattern: z.string().optional().describe('Optional LIKE pattern to filter table names (e.g., "user%")'),
})

export const ListTablesOutput = z.object({
  tables: z.array(z.string()).describe('Array of table names'),
  count: z.number().describe('Number of tables found'),
})

export const listTables = pikkuSessionlessFunc({
  description: 'Lists all tables in the MySQL database',
  node: { displayName: 'List Tables', category: 'Database', type: 'action' },
  input: ListTablesInput,
  output: ListTablesOutput,
  func: async ({ mysql }, { pattern }) => {
    let query = 'SHOW TABLES'
    const values: string[] = []

    if (pattern) {
      query += ' LIKE ?'
      values.push(pattern)
    }

    const [rows] = await mysql.execute(query, values)
    const results = rows as Record<string, string>[]

    const tables = results.map((row) => Object.values(row)[0])

    return {
      tables,
      count: tables.length,
    }
  },
})
