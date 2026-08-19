import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SpaceTagCreateInput = z.object({
  spaceId: z.string(),
  name: z.string().optional(),
  tag_bg: z.string().optional(),
  tag_fg: z.string().optional(),
})

export const SpaceTagCreateOutput = z.record(z.string(), z.unknown())

export const spaceTagCreate = pikkuSessionlessFunc({
  description: "Space tag create",
  input: SpaceTagCreateInput,
  output: SpaceTagCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/space/{spaceId}/tag", data) as any
  },
})
