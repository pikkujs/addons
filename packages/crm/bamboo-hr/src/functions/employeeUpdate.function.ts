import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeUpdateInput = z.object({
  employeeId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z.string().optional(),
})

export const EmployeeUpdateOutput = z.object({
  success: z.boolean().optional(),
})

export const employeeUpdate = pikkuSessionlessFunc({
  description: "Update an employee",
  input: EmployeeUpdateInput,
  output: EmployeeUpdateOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/employees/{employeeId}", data) as any
  },
})
