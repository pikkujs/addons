import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsAppHealthInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const UtilsAppHealthOutput = z.object({
  message: z.string().optional(),
  timestamp: z.string().optional(),
  uptime: z.string().optional(),
})

export const utilsAppHealth = pikkuSessionlessFunc({
  description: "Get Application Health Status",
  input: UtilsAppHealthInput,
  output: UtilsAppHealthOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/health", data) as any
  },
})
