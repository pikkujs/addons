import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeDocumentGetAllInput = z.object({
  employeeId: z.string(),
})

export const EmployeeDocumentGetAllOutput = z.record(z.string(), z.unknown())

export const employeeDocumentGetAll = pikkuSessionlessFunc({
  description: "Get many employee documents",
  input: EmployeeDocumentGetAllInput,
  output: EmployeeDocumentGetAllOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/employees/{employeeId}/files/view", data) as any
  },
})
