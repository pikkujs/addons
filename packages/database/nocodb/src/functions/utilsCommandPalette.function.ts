import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UtilsCommandPaletteOutput = z.unknown()

export const utilsCommandPalette = pikkuSessionlessFunc({
  description: "Get dynamic command palette suggestions based on scope",
  output: UtilsCommandPaletteOutput,
  func: async ({ nocodb }) => {
    return nocodb.call("POST", "/api/v1/command_palette") as any
  },
})
