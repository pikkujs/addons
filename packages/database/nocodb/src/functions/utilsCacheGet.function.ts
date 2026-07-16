import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UtilsCacheGetInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const utilsCacheGet = pikkuSessionlessFunc({
  description: "Get All K/V pairs in NocoCache",
  input: UtilsCacheGetInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/cache", data)
  },
})
