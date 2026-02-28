import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteRecordInput = z.object({
  baseId: z.string().describe('Airtable Base ID'),
  tableId: z.string().describe('Table ID or name'),
  recordId: z.string().describe('Record ID to delete'),
})

export const DeleteRecordOutput = z.object({
  id: z.string().describe('Deleted record ID'),
  deleted: z.boolean().describe('Whether the record was deleted'),
})

type Output = z.infer<typeof DeleteRecordOutput>

export const deleteRecord = pikkuSessionlessFunc({
  description: 'Deletes a record from an Airtable table',
  node: { displayName: 'Delete Record', category: 'Database', type: 'action' },
  input: DeleteRecordInput,
  output: DeleteRecordOutput,
  func: async ({ airtable }, { baseId, tableId, recordId }) => {
    const result = await airtable.deleteRecord(baseId, tableId, recordId)

    return {
      id: result.id,
      deleted: result.deleted,
    }
  },
})
