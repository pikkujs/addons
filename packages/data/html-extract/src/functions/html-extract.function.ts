import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import * as cheerio from 'cheerio'

export const HtmlExtractInput = z.object({
  html: z.string().describe('HTML content to extract data from'),
  extractions: z.array(z.object({
    key: z.string().describe('Name for the extracted value'),
    cssSelector: z.string().describe('CSS selector to target elements'),
    returnValue: z.enum(['text', 'html', 'attribute', 'value']).describe('What to extract from matched elements'),
    attribute: z.string().optional().describe('Attribute name (required when returnValue is "attribute")'),
    returnArray: z.boolean().optional().describe('Return all matches as array instead of first match'),
    skipSelectors: z.string().optional().describe('CSS selectors for child elements to exclude'),
  })).describe('Extraction rules'),
  trimValues: z.boolean().optional().describe('Trim whitespace from extracted values'),
  cleanUpText: z.boolean().optional().describe('Condense multiple whitespace characters'),
})

export const HtmlExtractOutput = z.object({
  data: z.record(z.any()).describe('Extracted data keyed by extraction rule names'),
})

export const htmlExtract = pikkuSessionlessFunc({
  description: 'Extract data from HTML using CSS selectors',
  input: HtmlExtractInput,
  output: HtmlExtractOutput,
  node: { displayName: 'HTML Extract', category: 'Data', type: 'action' },
  func: async (_services, { html, extractions, trimValues, cleanUpText }) => {
    const $ = cheerio.load(html)
    const data: Record<string, any> = {}

    for (const extraction of extractions) {
      const { key, cssSelector, returnValue, attribute, returnArray, skipSelectors } = extraction
      const elements = $(cssSelector)

      const extractValue = (el: cheerio.Cheerio<any>): string => {
        if (skipSelectors) {
          const clone = el.clone()
          clone.find(skipSelectors).remove()
          return getValueFromElement(clone, returnValue, attribute, $)
        }
        return getValueFromElement(el, returnValue, attribute, $)
      }

      if (returnArray) {
        const values: string[] = []
        elements.each((_i, elem) => {
          let val = extractValue($(elem))
          if (trimValues) val = val.trim()
          if (cleanUpText) val = val.replace(/\s+/g, ' ')
          values.push(val)
        })
        data[key] = values
      } else {
        let val = elements.length > 0 ? extractValue(elements.first()) : ''
        if (trimValues) val = val.trim()
        if (cleanUpText) val = val.replace(/\s+/g, ' ')
        data[key] = val
      }
    }

    return { data }
  },
})

function getValueFromElement(
  el: cheerio.Cheerio<any>,
  returnValue: string,
  attribute: string | undefined,
  $: cheerio.CheerioAPI
): string {
  switch (returnValue) {
    case 'text':
      return el.text()
    case 'html':
      return el.html() ?? ''
    case 'attribute':
      return attribute ? (el.attr(attribute) ?? '') : ''
    case 'value':
      return el.val()?.toString() ?? ''
    default:
      return el.text()
  }
}
