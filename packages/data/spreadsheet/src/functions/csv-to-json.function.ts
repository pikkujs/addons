import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { parse } from 'csv-parse/sync'

export const CsvToJsonInput = z.object({
  csv: z.string().describe('CSV string to parse'),
  delimiter: z.string().optional().describe('Column delimiter (default: comma)'),
  columns: z.boolean().optional().describe('Use the first row as column headers'),
  skipEmptyLines: z.boolean().optional().describe('Skip empty lines'),
  fromLine: z.number().optional().describe('Start parsing from this line number (1-based)'),
  trim: z.boolean().optional().describe('Trim whitespace from values'),
})

export const CsvToJsonOutput = z.object({
  data: z.array(z.any()).describe('Parsed rows as JSON objects or arrays'),
})

export const csvToJson = pikkuSessionlessFunc({
  description: 'Parse a CSV string into JSON rows',
  input: CsvToJsonInput,
  output: CsvToJsonOutput,
  node: { displayName: 'CSV to JSON', category: 'CSV', type: 'action' },
  func: async (_services, { csv, delimiter, columns, skipEmptyLines, fromLine, trim }) => {
    const data = parse(csv, {
      delimiter: delimiter ?? ',',
      columns: columns ?? true,
      skip_empty_lines: skipEmptyLines ?? true,
      from_line: fromLine ?? 1,
      trim: trim ?? true,
    })
    return { data }
  },
})
