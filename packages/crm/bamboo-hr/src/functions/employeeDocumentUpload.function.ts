import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeDocumentUploadInput = z.object({
  employeeId: z.string(),
  fileName: z.string().optional(),
  category: z.string().optional(),
})

export const EmployeeDocumentUploadOutput = z.object({
  fileId: z.string().optional(),
})

export const employeeDocumentUpload = pikkuSessionlessFunc({
  description: "Upload an employee document",
  input: EmployeeDocumentUploadInput,
  output: EmployeeDocumentUploadOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("POST", "/employees/{employeeId}/files", data) as any
  },
})
