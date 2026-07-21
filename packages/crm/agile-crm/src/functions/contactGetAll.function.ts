import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllInput = z.object({
  filterJson: z.string().optional(),
  page_size: z.number().optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get many contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ agileCrm }, data) => {
    return agileCrm.call("POST", "/api/filters/filter/dynamic-filter", data) as any
  },
})
