import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { escapeIdentifier } from '../shared.js'

export const DropTableInput = z.object({
  table: z.string().describe('The table to drop'),
  cascade: z.boolean().optional().describe('Also drop dependent objects'),
  // TODO: When turning this into a schema, the default true makes it non optional as a typedschema
  ifExists: z.boolean().optional().default(true).describe('Do not throw an error if the table does not exist'),
})

export const DropTableOutput = z.object({
  success: z.boolean().describe('Whether the drop was successful'),
})

type Output = z.infer<typeof DropTableOutput>

export const dropTable = pikkuSessionlessFunc({
  description: 'Drops a PostgreSQL table',
  node: { displayName: 'Drop Table', category: 'Database', type: 'action' },
  input: DropTableInput,
  output: DropTableOutput,
  func: async ({ postgres }, { table, cascade, ifExists }) => {
    let query = 'DROP TABLE'

    if (ifExists !== false) {
      query += ' IF EXISTS'
    }

    query += ` ${escapeIdentifier(table)}`

    if (cascade) {
      query += ' CASCADE'
    }

    await postgres.query(query)

    return {
      success: true,
    }
  },
})
