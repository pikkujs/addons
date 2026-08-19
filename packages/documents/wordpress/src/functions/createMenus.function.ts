import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateMenusInput = z.object({
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  locations: z.array(z.string()).optional().describe("The locations assigned to the menu."),
  auto_add: z.boolean().optional().describe("Whether to automatically add top level pages to this menu."),
})

export const CreateMenusOutput = z.object({
  id: z.number().int().optional().describe("Unique identifier for the term."),
  description: z.string().optional().describe("HTML description of the term."),
  name: z.string().optional().describe("HTML title for the term."),
  slug: z.string().optional().describe("An alphanumeric identifier for the term unique to its type."),
  meta: z.record(z.string(), z.unknown()).optional().describe("Meta fields."),
  locations: z.array(z.string()).optional().describe("The locations assigned to the menu."),
  auto_add: z.boolean().optional().describe("Whether to automatically add top level pages to this menu."),
})

export const createMenus = pikkuSessionlessFunc({
  input: CreateMenusInput,
  output: CreateMenusOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/menus", data) as any
  },
})
