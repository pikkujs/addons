import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateMediaPostProcessInput = z.object({
  id: z.string().describe("Unique identifier for the attachment."),
  action: z.literal("create-image-subsizes"),
})

export const createMediaPostProcess = pikkuSessionlessFunc({
  input: CreateMediaPostProcessInput,
  func: async ({ wordpress }, data) => {
    return wordpress.call("POST", "/media/{id}/post-process", data)
  },
})
