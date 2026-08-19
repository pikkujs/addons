import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeGetInput = z.object({
  employeeId: z.string(),
  fields: z.string().optional(),
})

export const EmployeeGetOutput = z.record(z.string(), z.unknown())

export const employeeGet = pikkuSessionlessFunc({
  description: "Get an employee",
  input: EmployeeGetInput,
  output: EmployeeGetOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/employees/{employeeId}", data) as any
  },
})
