import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretkeySetInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
  type: z.string().optional(),
  value: z.array(z.number().int()).optional(),
})

export const SecretkeySetOutput = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  created_at: z.string().optional(),
  name: z.string().optional(),
  public_key: z.array(z.number().int()).optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.number().int().optional(),
})

export const secretkeySet = pikkuSessionlessFunc({
  input: SecretkeySetInput,
  output: SecretkeySetOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secretkeys/{secret_name}', data) as any
  },
})
