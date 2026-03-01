import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import * as XLSX from 'xlsx'

export const XlsxToJsonInput = z.object({
  base64: z.string().describe('Base64-encoded spreadsheet file (XLSX, XLS, ODS, CSV)'),
  sheetName: z.string().optional().describe('Name of the sheet to read (default: first sheet)'),
  headerRow: z.boolean().optional().describe('Use the first row as column headers (default: true)'),
  range: z.string().optional().describe('Cell range to read (e.g. "A1:D10")'),
  rawValues: z.boolean().optional().describe('Return raw values instead of formatted text'),
})

export const XlsxToJsonOutput = z.object({
  data: z.array(z.any()).describe('Parsed rows as JSON objects or arrays'),
  sheetNames: z.array(z.string()).describe('List of sheet names in the workbook'),
})

export const xlsxToJson = pikkuSessionlessFunc({
  description: 'Parse a spreadsheet file (XLSX, XLS, ODS, CSV) into JSON rows',
  input: XlsxToJsonInput,
  output: XlsxToJsonOutput,
  node: { displayName: 'XLSX to JSON', category: 'XLSX', type: 'action' },
  func: async (_services, { base64, sheetName, headerRow, range, rawValues }) => {
    const buffer = Buffer.from(base64, 'base64')
    const workbook = XLSX.read(buffer, { type: 'buffer' })

    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]]

    if (!sheet) {
      throw new Error(`Sheet "${sheetName ?? workbook.SheetNames[0]}" not found`)
    }

    const data = XLSX.utils.sheet_to_json(sheet, {
      header: (headerRow ?? true) ? undefined : 1,
      range: range ?? undefined,
      raw: rawValues ?? false,
    })

    return { data, sheetNames: workbook.SheetNames }
  },
})
