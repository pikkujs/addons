import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TruncateInput = z.object({
  table: z.string().describe('The table to truncate'),
  cascade: z.boolean().optional().describe('Also truncate tables with foreign key references'),
  restartIdentity: z.boolean().optional().describe('Restart identity columns'),
})

export const TruncateOutput = z.object({
  success: z.boolean().describe('Whether the truncate was successful'),
})

type Output = z.infer<typeof TruncateOutput>

const escapeIdentifier = (identifier: string): string => {
  return '"' + identifier.replace(/"/g, '""') + '"'
}

export const truncate = pikkuSessionlessFunc({
  description: 'Truncates (empties) a PostgreSQL table',
  node: { displayName: 'Truncate Table', category: 'Database', type: 'action' },
  input: TruncateInput,
  output: TruncateOutput,
  func: async ({ postgres }, { table, cascade, restartIdentity }) => {
    let query = `TRUNCATE TABLE ${escapeIdentifier(table)}`

    if (restartIdentity) {
      query += ' RESTART IDENTITY'
    }

    if (cascade) {
      query += ' CASCADE'
    }

    await postgres.query(query)

    return {
      success: true,
    }
  },
})
