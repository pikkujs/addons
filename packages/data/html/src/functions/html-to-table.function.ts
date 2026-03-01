import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HtmlToTableInput = z.object({
  data: z.array(z.record(z.any())).describe('Array of objects to convert to an HTML table'),
  caption: z.string().optional().describe('Table caption'),
  capitalize: z.boolean().optional().describe('Capitalize header text'),
  tableAttributes: z.string().optional().describe('HTML attributes for the table element'),
  headerAttributes: z.string().optional().describe('HTML attributes for th elements'),
  rowAttributes: z.string().optional().describe('HTML attributes for tr elements'),
  cellAttributes: z.string().optional().describe('HTML attributes for td elements'),
})

export const HtmlToTableOutput = z.object({
  html: z.string().describe('Generated HTML table'),
})

export const htmlToTable = pikkuSessionlessFunc({
  description: 'Convert JSON data to an HTML table',
  input: HtmlToTableInput,
  output: HtmlToTableOutput,
  node: { displayName: 'HTML Table', category: 'Data', type: 'action' },
  func: async (_services, { data, caption, capitalize, tableAttributes, headerAttributes, rowAttributes, cellAttributes }) => {
    if (data.length === 0) {
      return { html: `<table${attr(tableAttributes)}></table>` }
    }

    const headers = [...new Set(data.flatMap((row) => Object.keys(row)))]
    const headerCells = headers
      .map((h) => {
        const label = capitalize ? h.charAt(0).toUpperCase() + h.slice(1) : h
        return `<th${attr(headerAttributes)}>${escapeHtml(label)}</th>`
      })
      .join('')

    const rows = data
      .map((row) => {
        const cells = headers
          .map((h) => `<td${attr(cellAttributes)}>${escapeHtml(String(row[h] ?? ''))}</td>`)
          .join('')
        return `<tr${attr(rowAttributes)}>${cells}</tr>`
      })
      .join('')

    const captionHtml = caption ? `<caption>${escapeHtml(caption)}</caption>` : ''
    const html = `<table${attr(tableAttributes)}>${captionHtml}<thead><tr${attr(rowAttributes)}>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`

    return { html }
  },
})

function attr(attributes?: string): string {
  return attributes ? ` ${attributes}` : ''
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
