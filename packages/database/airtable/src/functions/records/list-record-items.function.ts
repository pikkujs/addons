import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListRecordItemsInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  pageSize: z
    .number()
    .optional()
    .describe('Number of records per page (max 100)'),
  offset: z.string().optional().describe('Pagination offset from previous response'),
  filterByFormula: z
    .string()
    .optional()
    .describe('Airtable formula to filter records'),
  sort: z
    .array(
      z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']).optional(),
      })
    )
    .optional()
    .describe('Sort configuration'),
})

export const ListRecordItemsOutput = z
  .array(z.record(z.string(), z.unknown()))
  .describe(
    'One flattened object per record — `id`, `createdTime`, and each field hoisted to the top level (the shape n8n produces), ready to fan out over with graph:map.'
  )

export const listRecordItems = pikkuSessionlessFunc({
  description:
    'Lists records and returns one flattened object per record (id + createdTime + fields at the top level), ready to iterate over.',
  node: { displayName: 'List Record Items', category: 'Database', type: 'action' },
  input: ListRecordItemsInput,
  output: ListRecordItemsOutput,
  func: async (
    { airtable },
    { baseId, tableId, pageSize, offset, filterByFormula, sort }
  ) => {
    const result = await airtable.listRecords(baseId, tableId, {
      pageSize,
      offset,
      filterByFormula,
      sort,
    })

    return (
      result.records as Array<{
        id: string
        fields: Record<string, unknown>
        createdTime?: string
      }>
    ).map(({ id, createdTime, fields }) => ({
      id,
      createdTime,
      ...fields,
    }))
  },
})
