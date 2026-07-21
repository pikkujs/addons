import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryDeleteExternalInput = z.object({
  id: z.string(),
})

export const TimeEntryDeleteExternalOutput = z.record(z.string(), z.unknown())

export const timeEntryDeleteExternal = pikkuSessionlessFunc({
  description: "Time entry delete external",
  input: TimeEntryDeleteExternalInput,
  output: TimeEntryDeleteExternalOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/time_entries/{id}/external_reference", data) as any
  },
})
