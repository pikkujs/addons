import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LogGetInput = z.object({
  id: z.string(),
})

export const LogGetOutput = z.record(z.string(), z.unknown())

export const logGet = pikkuSessionlessFunc({
  description: "Get a log",
  input: LogGetInput,
  output: LogGetOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/task/log/{id}", data) as any
  },
})
