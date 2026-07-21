import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmployeeCreateInput = z.object({
  companyId: z.string(),
  GivenName: z.string().optional(),
  FamilyName: z.string().optional(),
})

export const EmployeeCreateOutput = z.record(z.string(), z.unknown())

export const employeeCreate = pikkuSessionlessFunc({
  description: "Employee create",
  input: EmployeeCreateInput,
  output: EmployeeCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/employee", data) as any
  },
})
