import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const QueryItem = z.object({
  query: z.string().describe('The SQL query to execute'),
  parameters: z.array(z.any()).optional().describe('Query parameters'),
})

export const TransactionInput = z.object({
  queries: z.array(QueryItem).describe('Array of queries to execute in a transaction'),
})

const QueryResult = z.object({
  results: z.array(z.record(z.string(), z.any())).describe('Query results'),
  rowCount: z.number().optional().describe('Number of affected rows'),
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
  func: async ({ postgres }, { queries }) => {
    const client = await postgres.connect()

    try {
      await client.query('BEGIN')

      const results: z.infer<typeof QueryResult>[] = []

      for (const { query, parameters } of queries) {
        const result = await client.query(query, parameters || [])
        results.push({
          results: result.rows,
          rowCount: result.rowCount ?? undefined,
        })
      }

      await client.query('COMMIT')

      return {
        results,
        success: true,
      }
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  },
})
