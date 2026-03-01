import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import * as XLSX from 'xlsx'

export const JsonToXlsxInput = z.object({
  data: z.array(z.record(z.any())).describe('Array of objects to write'),
  sheetName: z.string().optional().describe('Sheet name (default: "Sheet1")'),
  format: z.enum(['xlsx', 'csv', 'ods', 'html']).optional().describe('Output format (default: xlsx)'),
  includeHeader: z.boolean().optional().describe('Include header row (default: true)'),
})

export const JsonToXlsxOutput = z.object({
  base64: z.string().describe('Base64-encoded spreadsheet file'),
})

export const jsonToXlsx = pikkuSessionlessFunc({
  description: 'Convert JSON rows into a spreadsheet file (XLSX, CSV, ODS, HTML)',
  input: JsonToXlsxInput,
  output: JsonToXlsxOutput,
  node: { displayName: 'JSON to XLSX', category: 'XLSX', type: 'action' },
  func: async (_services, { data, sheetName, format, includeHeader }) => {
    const worksheet = XLSX.utils.json_to_sheet(data, {
      skipHeader: (includeHeader ?? true) ? false : true,
    })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1')

    const bookType = (format ?? 'xlsx') as XLSX.BookType
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType })
    const base64 = Buffer.from(buffer).toString('base64')

    return { base64 }
  },
})
