import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SpaceTagUpdateInput = z.object({
  spaceId: z.string(),
  tagName: z.string(),
  name: z.string().optional(),
  tag_bg: z.string().optional(),
  tag_fg: z.string().optional(),
})

export const SpaceTagUpdateOutput = z.record(z.string(), z.unknown())

export const spaceTagUpdate = pikkuSessionlessFunc({
  description: "Space tag update",
  input: SpaceTagUpdateInput,
  output: SpaceTagUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/space/{spaceId}/tag/{tagName}", data) as any
  },
})
