import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HubGetAllOutput = z.record(z.string(), z.unknown())

export const hubGetAll = pikkuSessionlessFunc({
  description: "Get many hubs",
  output: HubGetAllOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/hubs") as any
  },
})
