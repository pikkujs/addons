import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { parseStringPromise } from 'xml2js'

export const XmlToJsonInput = z.object({
  xml: z.string().describe('XML string to parse'),
  explicitArray: z.boolean().optional().default(false).describe('Always put child nodes in an array'),
  explicitRoot: z.boolean().optional().default(false).describe('Set this if you want to get the root node in the resulting object'),
  ignoreAttrs: z.boolean().optional().default(false).describe('Ignore all XML attributes'),
  mergeAttrs: z.boolean().optional().default(true).describe('Merge attributes and child elements as properties of the parent'),
  trim: z.boolean().optional().default(true).describe('Trim the whitespace at the beginning and end of text nodes'),
  normalize: z.boolean().optional().default(false).describe('Trim whitespaces inside text nodes'),
})

export const XmlToJsonOutput = z.object({
  data: z.any().describe('Parsed JSON object'),
})

export const xmlToJson = pikkuSessionlessFunc({
  description: 'Parse an XML string into a JSON object',
  input: XmlToJsonInput,
  output: XmlToJsonOutput,
  node: { displayName: 'XML to JSON', category: 'Parse', type: 'action' },
  func: async (_services, { xml, explicitArray, explicitRoot, ignoreAttrs, mergeAttrs, trim, normalize }) => {
    const data = await parseStringPromise(xml, {
      explicitArray: explicitArray ?? false,
      explicitRoot: explicitRoot ?? false,
      ignoreAttrs: ignoreAttrs ?? false,
      mergeAttrs: mergeAttrs ?? true,
      trim: trim ?? true,
      normalize: normalize ?? false,
    })
    return { data }
  },
})
