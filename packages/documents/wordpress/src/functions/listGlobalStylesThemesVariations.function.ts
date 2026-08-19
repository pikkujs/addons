import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGlobalStylesThemesVariationsInput = z.object({
  stylesheet: z.string().describe("The theme identifier"),
})

export const listGlobalStylesThemesVariations = pikkuSessionlessFunc({
  input: ListGlobalStylesThemesVariationsInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/themes/{stylesheet}/variations", data)
  },
})
