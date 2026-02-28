import { z } from 'zod'

export const TranslationSchema = z.object({
  detected_source_language: z.string(),
  text: z.string(),
})

export type Translation = z.infer<typeof TranslationSchema>

export const LanguageSchema = z.object({
  language: z.string(),
  name: z.string(),
  supports_formality: z.boolean().optional(),
})

export type Language = z.infer<typeof LanguageSchema>
