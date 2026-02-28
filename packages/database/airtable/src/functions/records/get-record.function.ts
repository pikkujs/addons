import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetRecordInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  recordId: z.string().describe('Record ID'),
})

export const GetRecordOutput = z.object({
  id: z.string().describe('Record ID'),
  fields: z.record(z.string(), z.any()).describe('Record fields'),
})

type Output = z.infer<typeof GetRecordOutput>

export const getRecord = pikkuSessionlessFunc({
  description: 'Gets a single record from an Airtable table',
  node: { displayName: 'Get Record', category: 'Database', type: 'action' },
  input: GetRecordInput,
  output: GetRecordOutput,
  func: async ({ airtable }, { baseId, tableId, recordId }) => {
    const result = await airtable.getRecord(baseId, tableId, recordId)

    return {
      id: result.id,
      fields: result.fields,
    }
  },
})
