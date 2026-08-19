import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReleaseUpdateInput = z.object({
  projectId: z.string(),
  tagName: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  milestones: z.string().optional(),
  released_at: z.string().optional(),
})

export const ReleaseUpdateOutput = z.record(z.string(), z.unknown())

export const releaseUpdate = pikkuSessionlessFunc({
  description: "Update a release",
  input: ReleaseUpdateInput,
  output: ReleaseUpdateOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("PUT", "/projects/{projectId}/releases/{tagName}", data) as any
  },
})
