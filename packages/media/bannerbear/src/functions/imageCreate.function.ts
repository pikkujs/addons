import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ImageCreateInput = z.object({
  template: z.string().optional(),
  webhook_url: z.string().optional(),
  metadata: z.string().optional(),
})

export const ImageCreateOutput = z.object({
  uid: z.string().optional(),
  status: z.string().optional(),
})

export const imageCreate = pikkuSessionlessFunc({
  description: "Create an image",
  input: ImageCreateInput,
  output: ImageCreateOutput,
  func: async ({ bannerbear }, data) => {
    return bannerbear.call("POST", "/images", data) as any
  },
})
