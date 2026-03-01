import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NodeHtmlMarkdown } from 'node-html-markdown'

export const HtmlToMarkdownInput = z.object({
  html: z.string().describe('HTML content to convert'),
  keepDataImages: z.boolean().optional().describe('Keep data: images in output'),
  useLinkReferenceDefinitions: z.boolean().optional().describe('Use reference-style links instead of inline'),
  preferNativeParser: z.boolean().optional().describe('Use native parser if available (faster)'),
})

export const HtmlToMarkdownOutput = z.object({
  markdown: z.string().describe('Converted Markdown content'),
})

export const htmlToMarkdown = pikkuSessionlessFunc({
  description: 'Convert HTML to Markdown',
  input: HtmlToMarkdownInput,
  output: HtmlToMarkdownOutput,
  node: { displayName: 'HTML to Markdown', category: 'Data', type: 'action' },
  func: async (_services, { html, keepDataImages, useLinkReferenceDefinitions, preferNativeParser }) => {
    const markdown = NodeHtmlMarkdown.translate(html, {
      keepDataImages,
      useLinkReferenceDefinitions,
      preferNativeParser,
    })
    return { markdown }
  },
})
