import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SelectInput = z.object({
  table: z.string().describe('Table name'),
  columns: z.string().optional().describe('Columns to select (comma-separated, defaults to *)'),
  filters: z.array(z.object({
    column: z.string(),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in']),
    value: z.any(),
  })).optional().describe('Filter conditions'),
  orderBy: z.object({
    column: z.string(),
    ascending: z.boolean().optional(),
  }).optional().describe('Order configuration'),
  limit: z.number().optional().describe('Maximum rows to return'),
  offset: z.number().optional().describe('Number of rows to skip'),
})

export const SelectOutput = z.object({
  data: z.array(z.record(z.string(), z.any())).describe('Selected rows'),
  count: z.number().optional().describe('Total count if requested'),
})

type Output = z.infer<typeof SelectOutput>

export const selectRows = pikkuSessionlessFunc({
  description: 'Selects rows from a Supabase table',
  node: { displayName: 'Select Rows', category: 'Database', type: 'action' },
  input: SelectInput,
  output: SelectOutput,
  func: async ({ supabase }, { table, columns, filters, orderBy, limit, offset }) => {
    let query = supabase.from(table).select(columns || '*')

    if (filters) {
      for (const filter of filters) {
        query = query.filter(filter.column, filter.operator, filter.value)
      }
    }

    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
    }

    if (limit !== undefined) {
      query = query.limit(limit)
    }

    if (offset !== undefined) {
      query = query.range(offset, offset + (limit || 1000) - 1)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Supabase error: ${error.message ?? error.details ?? error.code ?? JSON.stringify(error)}`)
    }

    return {
      data: data || [],
      count: data?.length,
    }
  },
})
