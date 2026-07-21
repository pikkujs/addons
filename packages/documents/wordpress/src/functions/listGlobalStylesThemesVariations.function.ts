import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListGlobalStylesThemesVariationsInput = z.object({
  stylesheet: z.string().describe("The theme identifier"),
})

export const listGlobalStylesThemesVariations = pikkuSessionlessFunc({
  input: ListGlobalStylesThemesVariationsInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/themes/{stylesheet}/variations", data)
  },
})
