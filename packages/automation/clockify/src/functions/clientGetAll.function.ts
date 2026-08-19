import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ClientGetAllInput = z.object({
  workspaceId: z.string(),
  "page-size": z.number().int().optional(),
})

export const ClientGetAllOutput = z.record(z.string(), z.unknown())

export const clientGetAll = pikkuSessionlessFunc({
  description: "Get all clients",
  input: ClientGetAllInput,
  output: ClientGetAllOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/clients", data) as any
  },
})
