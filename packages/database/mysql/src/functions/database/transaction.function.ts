import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const QueryItem = z.object({
  query: z.string().describe('The SQL query to execute'),
  parameters: z.array(z.any()).optional().describe('Query parameters'),
})

export const TransactionInput = z.object({
  queries: z.array(QueryItem).describe('Array of queries to execute in a transaction'),
})

export const QueryResult = z.object({
  results: z.array(z.record(z.string(), z.any())).describe('Query results'),
  affectedRows: z.number().optional().describe('Number of affected rows'),
  insertId: z.number().optional().describe('Insert ID if applicable'),
})

export const TransactionOutput = z.object({
  results: z.array(QueryResult).describe('Results for each query in order'),
  success: z.boolean().describe('Whether all queries completed successfully'),
})

export const transaction = pikkuSessionlessFunc({
  description: 'Executes multiple queries in a transaction with automatic rollback on error',
  node: { displayName: 'Execute Transaction', category: 'Database', type: 'action' },
  input: TransactionInput,
  output: TransactionOutput,
  func: async ({ mysql }, { queries }) => {
    const connection = await mysql.getConnection()

    try {
      await connection.beginTransaction()

      const results: z.infer<typeof QueryResult>[] = []

      for (const { query, parameters } of queries) {
        const [rows] = await connection.execute(query, parameters || [])

        if (Array.isArray(rows)) {
          results.push({
            results: rows as Record<string, unknown>[],
          })
        } else {
          const result = rows as { affectedRows?: number; insertId?: number | bigint }
          results.push({
            results: [],
            affectedRows: result.affectedRows,
            insertId: result.insertId ? Number(result.insertId) : undefined,
          })
        }
      }

      await connection.commit()
      connection.release()

      return {
        results,
        success: true,
      }
    } catch (error) {
      await connection.rollback()
      connection.release()
      throw error
    }
  },
})
