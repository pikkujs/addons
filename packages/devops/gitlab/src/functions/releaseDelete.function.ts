import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReleaseDeleteInput = z.object({
  projectId: z.string(),
  tagName: z.string(),
})

export const ReleaseDeleteOutput = z.record(z.string(), z.unknown())

export const releaseDelete = pikkuSessionlessFunc({
  description: "Delete a release",
  input: ReleaseDeleteInput,
  output: ReleaseDeleteOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("DELETE", "/projects/{projectId}/releases/{tagName}", data) as any
  },
})
