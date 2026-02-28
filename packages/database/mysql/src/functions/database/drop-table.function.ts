import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../../shared.js'

export const DropTableInput = z.object({
  table: z.string().describe('The table to drop'),
  ifExists: z.boolean().optional().default(true).describe('Only drop if table exists (prevents errors)'),
})

export const DropTableOutput = z.object({
  success: z.boolean().describe('Whether the operation was successful'),
})

export const dropTable = pikkuSessionlessFunc({
  description: 'Drops a MySQL table, removing it completely including structure and data',
  node: { displayName: 'Drop Table', category: 'Database', type: 'action' },
  input: DropTableInput,
  output: DropTableOutput,
  func: async ({ mysql }, { table, ifExists }) => {
    const ifExistsClause = ifExists !== false ? 'IF EXISTS ' : ''
    await mysql.execute(`DROP TABLE ${ifExistsClause}${escapeIdentifier(table)}`)
    return { success: true }
  },
})
