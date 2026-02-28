import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpsertInput = z.object({
  table: z.string().describe('Table name'),
  data: z.union([
    z.record(z.string(), z.any()),
    z.array(z.record(z.string(), z.any())),
  ]).describe('Data to upsert (single object or array)'),
  onConflict: z.string().optional().describe('Conflict column(s) for upsert'),
  returning: z.boolean().optional().describe('Return upserted data'),
})

export const UpsertOutput = z.object({
  data: z.array(z.record(z.string(), z.any())).optional().describe('Upserted rows'),
  count: z.number().describe('Number of rows affected'),
})

type Output = z.infer<typeof UpsertOutput>

export const upsertRows = pikkuSessionlessFunc({
  description: 'Inserts or updates rows in a Supabase table',
  node: { displayName: 'Upsert Rows', category: 'Database', type: 'action' },
  input: UpsertInput,
  output: UpsertOutput,
  func: async ({ supabase }, { table, data, onConflict, returning }) => {
    let query: any = supabase.from(table).upsert(data, {
      onConflict,
    })

    if (returning) {
      query = query.select()
    }

    const { data: result, error } = await query

    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }

    return {
      data: result || undefined,
      count: Array.isArray(data) ? data.length : 1,
    }
  },
})
