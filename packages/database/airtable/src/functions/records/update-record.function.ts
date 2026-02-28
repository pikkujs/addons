import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateRecordInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  recordId: z.string().describe('Record ID to update'),
  fields: z.record(z.string(), z.any()).describe('Fields to update'),
})

export const UpdateRecordOutput = z.object({
  id: z.string().describe('Updated record ID'),
  fields: z.record(z.string(), z.any()).describe('Updated record fields'),
})

type Output = z.infer<typeof UpdateRecordOutput>

export const updateRecord = pikkuSessionlessFunc({
  description: 'Updates a record in an Airtable table',
  node: { displayName: 'Update Record', category: 'Database', type: 'action' },
  input: UpdateRecordInput,
  output: UpdateRecordOutput,
  func: async ({ airtable }, { baseId, tableId, recordId, fields }) => {
    const result = await airtable.updateRecord(baseId, tableId, recordId, fields)

    return {
      id: result.id,
      fields: result.fields,
    }
  },
})
