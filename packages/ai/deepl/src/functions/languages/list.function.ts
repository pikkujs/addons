import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  type: z.enum(['source', 'target']).optional().describe('Type of languages to list'),
})

const outputSchema = z.array(z.object({
  language: z.string(),
  name: z.string(),
  supports_formality: z.boolean().optional(),
}))

type Input = z.infer<typeof inputSchema>
type Output = z.infer<typeof outputSchema>

export const languagesList = pikkuSessionlessFunc({
  description: 'List supported languages in DeepL',
  node: { displayName: 'List Languages', category: 'Translations', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ deepl }, data) => {
    return await deepl.request('GET', 'languages', { qs: data as Record<string, string | undefined> }) as Output
  },
})
