import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SpaceTagGetAllInput = z.object({
  spaceId: z.string(),
})

export const SpaceTagGetAllOutput = z.record(z.string(), z.unknown())

export const spaceTagGetAll = pikkuSessionlessFunc({
  description: "Space tag get all",
  input: SpaceTagGetAllInput,
  output: SpaceTagGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/space/{spaceId}/tag", data) as any
  },
})
