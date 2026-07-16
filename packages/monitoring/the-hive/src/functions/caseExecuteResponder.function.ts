import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseExecuteResponderInput = z.object({
  id: z.string(),
  responderId: z.string().optional(),
})

export const CaseExecuteResponderOutput = z.record(z.string(), z.unknown())

export const caseExecuteResponder = pikkuSessionlessFunc({
  description: "Execute a responder on a case",
  input: CaseExecuteResponderInput,
  output: CaseExecuteResponderOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/case/{id}/responder", data) as any
  },
})
