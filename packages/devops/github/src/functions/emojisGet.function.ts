// emojis — List emojis available to use on GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmojisGetOutput = z.record(z.string(), z.string())

export const emojisGet = pikkuSessionlessFunc({
  description: "Lists all the emojis available to use on GitHub.",
  output: EmojisGetOutput,
  func: async ({ github }) => {
    return github.call("GET", "/emojis") as any
  },
})
