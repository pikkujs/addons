import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TranslateTextInput = z.object({
  text: z.string().describe('Text to translate'),
  target_lang: z.string().describe('Target language code (e.g., EN, DE, FR)'),
  source_lang: z.string().optional().describe('Source language code (auto-detected if not specified)'),
  formality: z.enum(['default', 'more', 'less', 'prefer_more', 'prefer_less']).optional().describe('Formality level'),
})

export const TranslateTextOutput = z.object({
  translations: z.array(z.object({
    detected_source_language: z.string(),
    text: z.string(),
  })),
})

type Input = z.infer<typeof TranslateTextInput>
type Output = z.infer<typeof TranslateTextOutput>

export const translateText = pikkuSessionlessFunc({
  description: 'Translate text to another language using DeepL',
  node: { displayName: 'Translate Text', category: 'Translations', type: 'action' },
  input: TranslateTextInput,
  output: TranslateTextOutput,
  func: async ({ deepl }, data) => {
    return await deepl.request('POST', 'translate', { body: data }) as Output
  },
})
