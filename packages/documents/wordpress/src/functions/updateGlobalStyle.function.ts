import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateGlobalStyleInput = z.object({
  id: z.string(),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const UpdateGlobalStyleOutput = z.object({
  id: z.number().int().optional().describe("ID of global styles config."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const updateGlobalStyle = pikkuSessionlessFunc({
  input: UpdateGlobalStyleInput,
  output: UpdateGlobalStyleOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PUT", "/global-styles/{id}", data) as any
  },
})
