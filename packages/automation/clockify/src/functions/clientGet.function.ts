import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ClientGetInput = z.object({
  workspaceId: z.string(),
  clientId: z.string(),
})

export const ClientGetOutput = z.record(z.string(), z.unknown())

export const clientGet = pikkuSessionlessFunc({
  description: "Get a client",
  input: ClientGetInput,
  output: ClientGetOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/clients/{clientId}", data) as any
  },
})
