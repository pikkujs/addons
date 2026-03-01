import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { marked } from 'marked'

export const MarkdownToHtmlInput = z.object({
  markdown: z.string().describe('Markdown content to convert'),
  gfm: z.boolean().optional().describe('Enable GitHub Flavored Markdown (default: true)'),
  breaks: z.boolean().optional().describe('Convert newlines to <br> (default: false)'),
})

export const MarkdownToHtmlOutput = z.object({
  html: z.string().describe('Converted HTML content'),
})

export const markdownToHtml = pikkuSessionlessFunc({
  description: 'Convert Markdown to HTML',
  input: MarkdownToHtmlInput,
  output: MarkdownToHtmlOutput,
  node: { displayName: 'Markdown to HTML', category: 'Data', type: 'action' },
  func: async (_services, { markdown, gfm, breaks }) => {
    const html = await marked(markdown, {
      gfm: gfm ?? true,
      breaks: breaks ?? false,
    })
    return { html }
  },
})
