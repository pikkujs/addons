import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthEmailValidateInput = z.object({
  token: z.string().uuid().describe("Validation Token"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const AuthEmailValidateOutput = z.object({
  msg: z.string().optional().describe("Success Message"),
})

export const authEmailValidate = pikkuSessionlessFunc({
  description: "Api for verifying email where token need to be passed which is shared to user email.",
  input: AuthEmailValidateInput,
  output: AuthEmailValidateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/email/validate/{token}", data) as any
  },
})
