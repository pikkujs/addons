import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormAddSubscriberInput = z.object({
  id: z.string(),
  email: z.string().optional(),
  first_name: z.string().optional(),
})

export const FormAddSubscriberOutput = z.record(z.string(), z.unknown())

export const formAddSubscriber = pikkuSessionlessFunc({
  description: "FormAddSubscriber",
  input: FormAddSubscriberInput,
  output: FormAddSubscriberOutput,
  func: async ({ convertkit }, data) => {
    return convertkit.call("POST", "/forms/{id}/subscribe", data) as any
  },
})
