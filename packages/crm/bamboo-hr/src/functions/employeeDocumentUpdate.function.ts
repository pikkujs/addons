import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeDocumentUpdateInput = z.object({
  employeeId: z.string(),
  fileId: z.string(),
  name: z.string().optional(),
  categoryId: z.string().optional(),
  shareWithEmployee: z.string().optional(),
})

export const EmployeeDocumentUpdateOutput = z.object({
  success: z.boolean().optional(),
})

export const employeeDocumentUpdate = pikkuSessionlessFunc({
  description: "Update an employee document",
  input: EmployeeDocumentUpdateInput,
  output: EmployeeDocumentUpdateOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/employees/{employeeId}/files/{fileId}", data) as any
  },
})
