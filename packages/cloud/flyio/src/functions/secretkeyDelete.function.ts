import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretkeyDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
})

export const SecretkeyDeleteOutput = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  version: z.number().int().optional(),
})

export const secretkeyDelete = pikkuSessionlessFunc({
  input: SecretkeyDeleteInput,
  output: SecretkeyDeleteOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/secretkeys/{secret_name}', data) as any
  },
})
