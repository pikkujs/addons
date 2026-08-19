import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReleaseCreateInput = z.object({
  projectId: z.string(),
  tag_name: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  ref: z.string().optional(),
})

export const ReleaseCreateOutput = z.record(z.string(), z.unknown())

export const releaseCreate = pikkuSessionlessFunc({
  description: "Create a release",
  input: ReleaseCreateInput,
  output: ReleaseCreateOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("POST", "/projects/{projectId}/releases", data) as any
  },
})
