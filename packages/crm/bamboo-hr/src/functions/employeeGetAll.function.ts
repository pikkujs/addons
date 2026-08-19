import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeGetAllInput = z.object({
  limit: z.number().optional(),
})

export const EmployeeGetAllOutput = z.record(z.string(), z.unknown())

export const employeeGetAll = pikkuSessionlessFunc({
  description: "Get many employees",
  input: EmployeeGetAllInput,
  output: EmployeeGetAllOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/employees/directory", data) as any
  },
})
