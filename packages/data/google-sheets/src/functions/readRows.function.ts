import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReadRowsInput = z.object({
  spreadsheetId: z
    .string()
    .describe('The ID of the spreadsheet to read rows from.'),
  range: z
    .string()
    .describe(
      'The A1 notation of the range to read, e.g. `Sheet1!A:D`. The first row is treated as the header.'
    ),
  valueRenderOption: z
    .enum(['FORMATTED_VALUE', 'UNFORMATTED_VALUE', 'FORMULA'])
    .optional()
    .describe('How cell values should be represented.'),
})

export const ReadRowsOutput = z
  .array(z.record(z.string(), z.unknown()))
  .describe(
    'One object per data row, keyed by the header row — ready to fan out over with graph:map.'
  )

export const readRows = pikkuSessionlessFunc({
  description:
    'Reads a range and returns one object per row keyed by the header row (the shape n8n produces), ready to iterate over.',
  node: { displayName: 'Read Rows', category: 'Data', type: 'action' },
  input: ReadRowsInput,
  output: ReadRowsOutput,
  func: async ({ googleSheets }, data) => {
    const response = (await googleSheets.call(
      'GET',
      '/v4/spreadsheets/{spreadsheetId}/values/{range}',
      { ...data, majorDimension: 'ROWS' }
    )) as { values?: unknown[][] }

    const values = response.values ?? []
    if (values.length === 0) return []

    const headers = (values[0] ?? []).map((h) => String(h))
    return values.slice(1).map((row) => {
      const item: Record<string, unknown> = {}
      for (let i = 0; i < headers.length; i++) {
        item[headers[i]!] = row[i]
      }
      return item
    })
  },
})
