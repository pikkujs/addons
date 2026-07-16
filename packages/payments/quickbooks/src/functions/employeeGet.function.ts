import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmployeeGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const EmployeeGetOutput = z.record(z.string(), z.unknown())

export const employeeGet = pikkuSessionlessFunc({
  description: "Employee get",
  input: EmployeeGetInput,
  output: EmployeeGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/employee/{id}", data) as any
  },
})
