import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TotpGenerateInput = z.object({
  body: z.string().optional(),
})

export const TotpGenerateOutput = z.record(z.string(), z.unknown())

export const totpGenerate = pikkuSessionlessFunc({
  description: "Totp generate",
  input: TotpGenerateInput,
  output: TotpGenerateOutput,
  func: async ({ totp }, data) => {
    return totp.call("POST", "/generate", data) as any
  },
})
