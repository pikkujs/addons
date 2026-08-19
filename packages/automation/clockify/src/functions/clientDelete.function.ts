import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ClientDeleteInput = z.object({
  workspaceId: z.string(),
  clientId: z.string(),
})

export const ClientDeleteOutput = z.record(z.string(), z.unknown())

export const clientDelete = pikkuSessionlessFunc({
  description: "Delete a client",
  input: ClientDeleteInput,
  output: ClientDeleteOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("DELETE", "/workspaces/{workspaceId}/clients/{clientId}", data) as any
  },
})
