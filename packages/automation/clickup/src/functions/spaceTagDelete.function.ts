import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SpaceTagDeleteInput = z.object({
  spaceId: z.string(),
  tagName: z.string(),
})

export const SpaceTagDeleteOutput = z.record(z.string(), z.unknown())

export const spaceTagDelete = pikkuSessionlessFunc({
  description: "Space tag delete",
  input: SpaceTagDeleteInput,
  output: SpaceTagDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/space/{spaceId}/tag/{tagName}", data) as any
  },
})
