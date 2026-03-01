import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { convert } from 'html-to-text'

export const HtmlToTextInput = z.object({
  html: z.string().describe('HTML content to convert'),
  wordwrap: z.number().optional().describe('Word wrap column (0 to disable)'),
  preserveNewlines: z.boolean().optional().describe('Preserve existing newlines in text'),
})

export const HtmlToTextOutput = z.object({
  text: z.string().describe('Extracted plain text'),
})

export const htmlToText = pikkuSessionlessFunc({
  description: 'Convert HTML to plain text',
  input: HtmlToTextInput,
  output: HtmlToTextOutput,
  node: { displayName: 'HTML to Text', category: 'Data', type: 'action' },
  func: async (_services, { html, wordwrap, preserveNewlines }) => {
    const options: Record<string, any> = {}
    if (wordwrap !== undefined) options.wordwrap = wordwrap || false
    if (preserveNewlines !== undefined) options.preserveNewlines = preserveNewlines
    const text = convert(html, options)
    return { text }
  },
})
