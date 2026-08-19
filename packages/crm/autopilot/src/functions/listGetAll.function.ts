import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGetAllOutput = z.record(z.string(), z.unknown())

export const listGetAll = pikkuSessionlessFunc({
  description: "Get all lists",
  output: ListGetAllOutput,
  func: async ({ autopilot }) => {
    return autopilot.call("GET", "/lists") as any
  },
})
