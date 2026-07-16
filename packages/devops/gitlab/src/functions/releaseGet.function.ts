import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReleaseGetInput = z.object({
  projectId: z.string(),
  tagName: z.string(),
})

export const ReleaseGetOutput = z.record(z.string(), z.unknown())

export const releaseGet = pikkuSessionlessFunc({
  description: "Get a release",
  input: ReleaseGetInput,
  output: ReleaseGetOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/releases/{tagName}", data) as any
  },
})
