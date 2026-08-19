import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueLockInput = z.object({
  projectId: z.string(),
  issueNumber: z.string(),
  discussion_locked: z.boolean().optional(),
})

export const IssueLockOutput = z.record(z.string(), z.unknown())

export const issueLock = pikkuSessionlessFunc({
  description: "Lock an issue",
  input: IssueLockInput,
  output: IssueLockOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("POST", "/projects/{projectId}/issues/{issueNumber}/lock", data) as any
  },
})
