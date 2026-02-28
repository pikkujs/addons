import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InsertInput = z.object({
  table: z.string().describe('Table name'),
  data: z.union([
    z.record(z.string(), z.any()),
    z.array(z.record(z.string(), z.any())),
  ]).describe('Data to insert (single object or array)'),
  returning: z.boolean().optional().describe('Return inserted data'),
})

export const InsertOutput = z.object({
  data: z.array(z.record(z.string(), z.any())).optional().describe('Inserted rows'),
  count: z.number().describe('Number of rows inserted'),
})

type Output = z.infer<typeof InsertOutput>

export const insertRows = pikkuSessionlessFunc({
  description: 'Inserts rows into a Supabase table',
  node: { displayName: 'Insert Rows', category: 'Database', type: 'action' },
  input: InsertInput,
  output: InsertOutput,
  func: async ({ supabase }, { table, data, returning }) => {
    let query: any = supabase.from(table).insert(data)

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
