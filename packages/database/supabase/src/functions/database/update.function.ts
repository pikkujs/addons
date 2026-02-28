import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateInput = z.object({
  table: z.string().describe('Table name'),
  data: z.record(z.string(), z.any()).describe('Data to update'),
  filters: z.array(z.object({
    column: z.string(),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in']),
    value: z.any(),
  })).describe('Filter conditions (required)'),
  returning: z.boolean().optional().describe('Return updated data'),
})

export const UpdateOutput = z.object({
  data: z.array(z.record(z.string(), z.any())).optional().describe('Updated rows'),
})

type Output = z.infer<typeof UpdateOutput>

export const updateRows = pikkuSessionlessFunc({
  description: 'Updates rows in a Supabase table',
  node: { displayName: 'Update Rows', category: 'Database', type: 'action' },
  input: UpdateInput,
  output: UpdateOutput,
  func: async ({ supabase }, { table, data, filters, returning }) => {
    let query: any = supabase.from(table).update(data)

    for (const filter of filters) {
      query = query.filter(filter.column, filter.operator, filter.value)
    }

    if (returning) {
      query = query.select()
    }

    const { data: result, error } = await query

    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }

    return {
      data: result || undefined,
    }
  },
})
