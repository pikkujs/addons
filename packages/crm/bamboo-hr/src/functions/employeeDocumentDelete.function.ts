import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmployeeDocumentDeleteInput = z.object({
  employeeId: z.string(),
  fileId: z.string(),
})

export const EmployeeDocumentDeleteOutput = z.object({
  success: z.boolean().optional(),
})

export const employeeDocumentDelete = pikkuSessionlessFunc({
  description: "Delete an employee document",
  input: EmployeeDocumentDeleteInput,
  output: EmployeeDocumentDeleteOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("DELETE", "/employees/{employeeId}/files/{fileId}", data) as any
  },
})
