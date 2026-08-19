import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetMenuLocationInput = z.object({
  location: z.string().describe("An alphanumeric identifier for the menu location."),
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const GetMenuLocationOutput = z.object({
  name: z.string().optional().describe("The name of the menu location."),
  description: z.string().optional().describe("The description of the menu location."),
  menu: z.number().int().optional().describe("The ID of the assigned menu."),
})

export const getMenuLocation = pikkuSessionlessFunc({
  input: GetMenuLocationInput,
  output: GetMenuLocationOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/menu-locations/{location}", data) as any
  },
})
