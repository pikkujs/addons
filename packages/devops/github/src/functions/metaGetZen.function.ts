// meta — Endpoints that give information about the API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MetaGetZenOutput = z.string()

export const metaGetZen = pikkuSessionlessFunc({
  description: "Get a random sentence from the Zen of GitHub",
  output: MetaGetZenOutput,
  func: async ({ github }) => {
    return github.call("GET", "/zen") as any
  },
})
