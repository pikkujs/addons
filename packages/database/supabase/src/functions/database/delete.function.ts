import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteInput = z.object({
  table: z.string().describe('Table name'),
  filters: z.array(z.object({
    column: z.string(),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in']),
    value: z.any(),
  })).describe('Filter conditions (required)'),
  returning: z.boolean().optional().describe('Return deleted data'),
})

export const DeleteOutput = z.object({
  data: z.array(z.record(z.string(), z.any())).optional().describe('Deleted rows'),
})

type Output = z.infer<typeof DeleteOutput>

export const deleteRows = pikkuSessionlessFunc({
  description: 'Deletes rows from a Supabase table',
  node: { displayName: 'Delete Rows', category: 'Database', type: 'action' },
  input: DeleteInput,
  output: DeleteOutput,
  func: async ({ supabase }, { table, filters, returning }) => {
    let query: any = supabase.from(table).delete()

    for (const filter of filters) {
      query = query.filter(filter.column, filter.operator, filter.value)
    }

    if (returning) {
      query = query.select()
    }

    const { data: result, error } = await query

    if (error) {
      throw new Error(`Supabase error: ${error.message ?? error.details ?? error.code ?? JSON.stringify(error)}`)
    }

    return {
      data: result || undefined,
    }
  },
})
