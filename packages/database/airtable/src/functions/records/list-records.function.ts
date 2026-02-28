import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListRecordsInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  pageSize: z.number().optional().describe('Number of records per page (max 100)'),
  offset: z.string().optional().describe('Pagination offset from previous response'),
  filterByFormula: z.string().optional().describe('Airtable formula to filter records'),
  sort: z.array(z.object({
    field: z.string(),
    direction: z.enum(['asc', 'desc']).optional(),
  })).optional().describe('Sort configuration'),
})

export const ListRecordsOutput = z.object({
  records: z.array(z.object({
    id: z.string(),
    fields: z.record(z.string(), z.any()),
    createdTime: z.string().optional(),
  })).describe('List of records'),
  offset: z.string().optional().describe('Offset for next page'),
})

type Output = z.infer<typeof ListRecordsOutput>

export const listRecords = pikkuSessionlessFunc({
  description: 'Lists records from an Airtable table',
  node: { displayName: 'List Records', category: 'Database', type: 'action' },
  input: ListRecordsInput,
  output: ListRecordsOutput,
  func: async ({ airtable }, { baseId, tableId, pageSize, offset, filterByFormula, sort }) => {
    const result = await airtable.listRecords(baseId, tableId, {
      pageSize,
      offset,
      filterByFormula,
      sort,
    })

    return {
      records: result.records as Array<{ id: string; fields: Record<string, unknown>; createdTime?: string }>,
      offset: result.offset,
    }
  },
})
