import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListMenuLocationsInput = z.object({
  context: z.enum(["view", "embed", "edit"]).optional().default("view").describe("Scope under which the request is made; determines fields present in response."),
})

export const ListMenuLocationsOutput = z.object({
  name: z.string().optional().describe("The name of the menu location."),
  description: z.string().optional().describe("The description of the menu location."),
  menu: z.number().int().optional().describe("The ID of the assigned menu."),
})

export const listMenuLocations = pikkuSessionlessFunc({
  input: ListMenuLocationsInput,
  output: ListMenuLocationsOutput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/menu-locations", data) as any
  },
})
