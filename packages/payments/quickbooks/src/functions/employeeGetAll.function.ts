import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const EmployeeGetAllOutput = z.record(z.string(), z.unknown())

export const employeeGetAll = pikkuSessionlessFunc({
  description: "Employee get all",
  input: EmployeeGetAllInput,
  output: EmployeeGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/employee", data) as any
  },
})
