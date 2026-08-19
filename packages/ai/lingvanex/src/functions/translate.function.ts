import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TranslateInput = z.object({
  data: z.string().describe("The input text to translate"),
  to: z.string().describe("The target language code"),
  from: z.string().optional().describe("The source language code; omit to auto-detect"),
  platform: z.string().optional().default("api").describe("Platform identifier"),
  translateMode: z.string().optional().describe("Input text format; set to html to preserve html structure"),
})

export const TranslateOutput = z.object({
  err: z.string().optional(),
  result: z.string().optional(),
  sourceTransliteration: z.string().optional(),
  targetTransliteration: z.string().optional(),
  sourceLanguage: z.string().optional(),
})

export const translate = pikkuSessionlessFunc({
  description: "Translate text",
  input: TranslateInput,
  output: TranslateOutput,
  func: async ({ lingvanex }, data) => {
    return lingvanex.call("POST", "/translate", data) as any
  },
})
