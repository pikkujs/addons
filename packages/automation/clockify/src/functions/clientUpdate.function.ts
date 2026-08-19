import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ClientUpdateInput = z.object({
  workspaceId: z.string(),
  clientId: z.string(),
  name: z.string().optional(),
})

export const ClientUpdateOutput = z.record(z.string(), z.unknown())

export const clientUpdate = pikkuSessionlessFunc({
  description: "Update a client",
  input: ClientUpdateInput,
  output: ClientUpdateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("PUT", "/workspaces/{workspaceId}/clients/{clientId}", data) as any
  },
})
