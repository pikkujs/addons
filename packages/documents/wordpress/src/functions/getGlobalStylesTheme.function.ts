import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetGlobalStylesThemeInput = z.object({
  stylesheet: z.string().describe("The theme identifier"),
})

export const getGlobalStylesTheme = pikkuSessionlessFunc({
  input: GetGlobalStylesThemeInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("GET", "/global-styles/themes/{stylesheet}", data)
  },
})
