import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateMenusInput = z.object({
  id: z.string().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  locations: z.array(z.string()).optional().describe("The locations assigned to the menu."),
  auto_add: z.boolean().optional().describe("Whether to automatically add top level pages to this menu."),
})

export const UpdateMenusOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  locations: z.array(z.string()).optional().describe("The locations assigned to the menu."),
  auto_add: z.boolean().optional().describe("Whether to automatically add top level pages to this menu."),
})

export const updateMenus = pikkuSessionlessFunc({
  input: UpdateMenusInput,
  output: UpdateMenusOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("PUT", "/menus/{id}", data) as any
  },
})
