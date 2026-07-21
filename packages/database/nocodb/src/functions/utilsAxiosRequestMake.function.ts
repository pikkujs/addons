import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsAxiosRequestMakeInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const UtilsAxiosRequestMakeOutput = z.record(z.string(), z.unknown())

export const utilsAxiosRequestMake = pikkuSessionlessFunc({
  description: "Generic Axios Call",
  input: UtilsAxiosRequestMakeInput,
  output: UtilsAxiosRequestMakeOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/axiosRequestMake", data) as any
  },
})
