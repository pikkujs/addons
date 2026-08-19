import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const JobsListInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  job: z.string().optional(),
  status: z.string().optional(),
})

export const jobsList = pikkuSessionlessFunc({
  description: "Get list of jobs for a given base for the user",
  input: JobsListInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/jobs/{baseId}", data)
  },
})
