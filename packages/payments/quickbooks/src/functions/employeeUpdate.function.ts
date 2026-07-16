import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmployeeUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  GivenName: z.string().optional(),
})

export const EmployeeUpdateOutput = z.record(z.string(), z.unknown())

export const employeeUpdate = pikkuSessionlessFunc({
  description: "Employee update",
  input: EmployeeUpdateInput,
  output: EmployeeUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/employee/update", data) as any
  },
})
