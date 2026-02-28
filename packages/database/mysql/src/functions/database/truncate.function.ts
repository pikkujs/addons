import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const TruncateInput = z.object({
  table: z.string().describe('The table to truncate'),
})

export const TruncateOutput = z.object({
  success: z.boolean().describe('Whether the operation was successful'),
})

export const truncate = pikkuSessionlessFunc({
  description: 'Truncates a MySQL table, removing all data but preserving the structure',
  node: { displayName: 'Truncate Table', category: 'Database', type: 'action' },
  input: TruncateInput,
  output: TruncateOutput,
  func: async ({ mysql }, { table }) => {
    await mysql.execute(`TRUNCATE TABLE ${escapeIdentifier(table)}`)
    return { success: true }
  },
})
