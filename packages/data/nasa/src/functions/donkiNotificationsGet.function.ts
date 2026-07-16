import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DonkiNotificationsGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.string().optional(),
})

export const DonkiNotificationsGetOutput = z.record(z.string(), z.unknown())

export const donkiNotificationsGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI notifications data",
  input: DonkiNotificationsGetInput,
  output: DonkiNotificationsGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/notifications", data) as any
  },
})
