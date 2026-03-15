import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LanguagesListInput = z.object({
  type: z.enum(['source', 'target']).optional().describe('Type of languages to list'),
})

export const LanguagesListOutput = z.array(z.object({
  language: z.string(),
  name: z.string(),
  supports_formality: z.boolean().optional(),
}))

type Input = z.infer<typeof LanguagesListInput>
type Output = z.infer<typeof LanguagesListOutput>

export const languagesList = pikkuSessionlessFunc({
  description: 'List supported languages in DeepL',
  node: { displayName: 'List Languages', category: 'Translations', type: 'action' },
  input: LanguagesListInput,
  output: LanguagesListOutput,
  func: async ({ deepl }, data) => {
    return await deepl.request('GET', 'languages', { qs: data as Record<string, string | undefined> }) as Output
  },
})
