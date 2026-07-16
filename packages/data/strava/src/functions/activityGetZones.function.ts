import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityGetZonesInput = z.object({
  activityId: z.string(),
})

export const ActivityGetZonesOutput = z.record(z.string(), z.unknown())

export const activityGetZones = pikkuSessionlessFunc({
  description: "Get all activity zones",
  input: ActivityGetZonesInput,
  output: ActivityGetZonesOutput,
  func: async ({ strava }, data) => {
    return strava.call("GET", "/activities/{activityId}/zones", data) as any
  },
})
