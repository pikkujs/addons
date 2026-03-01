import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const JsonToCsvInput = z.object({
  data: z.array(z.record(z.any())).describe('Array of objects to convert to CSV'),
  delimiter: z.string().optional().describe('Column delimiter (default: comma)'),
  includeHeader: z.boolean().optional().describe('Include header row (default: true)'),
})

export const JsonToCsvOutput = z.object({
  csv: z.string().describe('Generated CSV string'),
})

export const jsonToCsv = pikkuSessionlessFunc({
  description: 'Convert JSON rows into a CSV string',
  input: JsonToCsvInput,
  output: JsonToCsvOutput,
  node: { displayName: 'JSON to CSV', category: 'CSV', type: 'action' },
  func: async (_services, { data, delimiter, includeHeader }) => {
    const sep = delimiter ?? ','
    const header = includeHeader ?? true

    if (data.length === 0) {
      return { csv: '' }
    }

    const keys = Object.keys(data[0])
    const rows: string[] = []

    if (header) {
      rows.push(keys.map((k) => escapeCsvField(k, sep)).join(sep))
    }

    for (const row of data) {
      rows.push(keys.map((k) => escapeCsvField(String(row[k] ?? ''), sep)).join(sep))
    }

    return { csv: rows.join('\n') }
  },
})

function escapeCsvField(value: string, delimiter: string): string {
  if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
