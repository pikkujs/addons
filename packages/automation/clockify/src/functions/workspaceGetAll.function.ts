import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkspaceGetAllOutput = z.record(z.string(), z.unknown())

export const workspaceGetAll = pikkuSessionlessFunc({
  description: "Get all workspaces",
  output: WorkspaceGetAllOutput,
  func: async ({ clockify }) => {
    return clockify.call("GET", "/workspaces") as any
  },
})
