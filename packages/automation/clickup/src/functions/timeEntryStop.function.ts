import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryStopInput = z.object({
  teamId: z.string(),
})

export const TimeEntryStopOutput = z.record(z.string(), z.unknown())

export const timeEntryStop = pikkuSessionlessFunc({
  description: "Time entry stop",
  input: TimeEntryStopInput,
  output: TimeEntryStopOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/team/{teamId}/time_entries/stop", data) as any
  },
})
