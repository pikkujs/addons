import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateRecordInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  fields: z.record(z.string(), z.any()).describe('Record fields to create'),
})

export const CreateRecordOutput = z.object({
  id: z.string().describe('Created record ID'),
  fields: z.record(z.string(), z.any()).describe('Created record fields'),
})

type Output = z.infer<typeof CreateRecordOutput>

export const createRecord = pikkuSessionlessFunc({
  description: 'Creates a new record in an Airtable table',
  node: { displayName: 'Create Record', category: 'Database', type: 'action' },
  input: CreateRecordInput,
  output: CreateRecordOutput,
  func: async ({ airtable }, { baseId, tableId, fields }) => {
    const result = await airtable.createRecord(baseId, tableId, fields)

    return {
      id: result.id,
      fields: result.fields,
    }
  },
})
