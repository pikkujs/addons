import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { Builder } from 'xml2js'

export const JsonToXmlInput = z.object({
  data: z.any().describe('JSON object to convert to XML'),
  rootName: z.string().optional().default('root').describe('Name of the root element'),
  headless: z.boolean().optional().default(false).describe('Omit the XML header'),
  cdata: z.boolean().optional().default(false).describe('Wrap text nodes in CDATA'),
})

export const JsonToXmlOutput = z.object({
  xml: z.string().describe('Generated XML string'),
})

export const jsonToXml = pikkuSessionlessFunc({
  description: 'Convert a JSON object into an XML string',
  input: JsonToXmlInput,
  output: JsonToXmlOutput,
  node: { displayName: 'JSON to XML', category: 'Generate', type: 'action' },
  func: async (_services, { data, rootName, headless, cdata }) => {
    const builder = new Builder({
      rootName: rootName ?? 'root',
      headless: headless ?? false,
      cdata: cdata ?? false,
    })
    const xml = builder.buildObject(data)
    return { xml }
  },
})
