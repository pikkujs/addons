import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateGlobalStyle2Input = z.object({
  id: z.string(),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const UpdateGlobalStyle2Output = z.object({
  id: z.number().int().optional().describe("ID of global styles config."),
  styles: z.record(z.string(), z.unknown()).optional().describe("Global styles."),
  settings: z.record(z.string(), z.unknown()).optional().describe("Global settings."),
  title: z.union([z.record(z.string(), z.unknown()), z.string()]).optional().describe("Title of the global styles variation."),
})

export const updateGlobalStyle2 = pikkuSessionlessFunc({
  input: UpdateGlobalStyle2Input,
  output: UpdateGlobalStyle2Output,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PATCH", "/global-styles/{id}", data) as any
  },
})
