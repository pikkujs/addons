import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetGlobalStyleInput = z.object({
  id: z.string().describe("ID of global styles config."),
})

export const GetGlobalStyleOutput = z.object({
  id: z.number().int().optional().describe("ID of global styles config."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const getGlobalStyle = pikkuSessionlessFunc({
  input: GetGlobalStyleInput,
  output: GetGlobalStyleOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/{id}", data) as any
  },
})
