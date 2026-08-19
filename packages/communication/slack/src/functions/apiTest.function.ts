import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ApiTestInput = z.object({
  error: z.string().optional().describe("Error response to return"),
  foo: z.string().optional().describe("example property to return"),
})

export const ApiTestOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response api.test method")

export const apiTest = pikkuSessionlessFunc({
  description: "Checks API calling code.",
  input: ApiTestInput,
  output: ApiTestOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/api.test", data) as any
  },
})
