import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmployeeCreateInput = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z.string().optional(),
  jobTitle: z.string().optional(),
})

export const EmployeeCreateOutput = z.object({
  id: z.string().optional(),
})

export const employeeCreate = pikkuSessionlessFunc({
  description: "Create an employee",
  input: EmployeeCreateInput,
  output: EmployeeCreateOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/employees", data) as any
  },
})
