import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomObjectGetInput = z.object({
  id: z.string(),
})

export const CustomObjectGetOutput = z.record(z.string(), z.unknown())

export const customObjectGet = pikkuSessionlessFunc({
  description: "Get CustomObject",
  input: CustomObjectGetInput,
  output: CustomObjectGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/CustomObject/{id}", data) as any
  },
})
