import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityGetAllInput = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
})

export const ActivityGetAllOutput = z.record(z.string(), z.unknown())

export const activityGetAll = pikkuSessionlessFunc({
  description: "Get many activities",
  input: ActivityGetAllInput,
  output: ActivityGetAllOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities", data) as any
  },
})
