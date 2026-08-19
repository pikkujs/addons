import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ImageGetInput = z.object({
  imageId: z.string(),
})

export const ImageGetOutput = z.object({
  uid: z.string().optional(),
  status: z.string().optional(),
})

export const imageGet = pikkuSessionlessFunc({
  description: "Get a specific image",
  input: ImageGetInput,
  output: ImageGetOutput,
  func: async ({ bannerbear }, data) => {
    return bannerbear.call("GET", "/images/{imageId}", data) as any
  },
})
