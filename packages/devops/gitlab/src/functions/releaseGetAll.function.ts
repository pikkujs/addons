import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReleaseGetAllInput = z.object({
  projectId: z.string(),
  order_by: z.string().optional(),
  sort: z.string().optional(),
  per_page: z.number().int().optional(),
})

export const ReleaseGetAllOutput = z.record(z.string(), z.unknown())

export const releaseGetAll = pikkuSessionlessFunc({
  description: "Get many releases",
  input: ReleaseGetAllInput,
  output: ReleaseGetAllOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/releases", data) as any
  },
})
