import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FormGetAllOutput = z.record(z.string(), z.unknown())

export const formGetAll = pikkuSessionlessFunc({
  description: "FormGetAll",
  output: FormGetAllOutput,
  func: async ({ convertkit }) => {
    return convertkit.call("GET", "/forms") as any
  },
})
