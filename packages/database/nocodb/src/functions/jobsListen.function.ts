import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const JobsListenInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const jobsListen = pikkuSessionlessFunc({
  description: "Listen for job events",
  input: JobsListenInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/jobs/listen", data)
  },
})
