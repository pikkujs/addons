import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ClientCreateInput = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
})

export const ClientCreateOutput = z.record(z.string(), z.unknown())

export const clientCreate = pikkuSessionlessFunc({
  description: "Create a client",
  input: ClientCreateInput,
  output: ClientCreateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("POST", "/workspaces/{workspaceId}/clients", data) as any
  },
})
