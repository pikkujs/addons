import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateGlobalStyleInput = z.object({
  id: z.string(),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const CreateGlobalStyleOutput = z.object({
  id: z.number().int().optional().describe("ID of global styles config."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const createGlobalStyle = pikkuSessionlessFunc({
  input: CreateGlobalStyleInput,
  output: CreateGlobalStyleOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/global-styles/{id}", data) as any
  },
})
