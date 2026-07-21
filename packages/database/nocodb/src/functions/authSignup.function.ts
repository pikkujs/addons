import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const AuthSignupInput = z.object({
  email: z.string().email().describe("Email address of the user"),
  password: z.string().min(8).max(128).describe("Password of the user"),
  firstname: z.union([z.string(), z.unknown()]).optional().describe("Model for StringOrNull"),
  lastname: z.union([z.string(), z.unknown()]).optional().describe("Model for StringOrNull"),
  token: z.union([z.string(), z.unknown()]).optional().describe("Sign Up Token. Used for invitation."),
  ignore_subscribe: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Ignore Subscription"),
})

export const AuthSignupOutput = z.object({
  token: z.string().optional().describe("The signed JWT token for information exchange"),
})

export const authSignup = pikkuSessionlessFunc({
  description: "Create a new user with provided email and password and first user is marked as super admin.",
  input: AuthSignupInput,
  output: AuthSignupOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/auth/user/signup", data) as any
  },
})
