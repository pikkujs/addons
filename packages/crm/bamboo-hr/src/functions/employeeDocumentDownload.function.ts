import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EmployeeDocumentDownloadInput = z.object({
  employeeId: z.string(),
  fileId: z.string(),
})

export const EmployeeDocumentDownloadOutput = z.record(z.string(), z.unknown())

export const employeeDocumentDownload = pikkuSessionlessFunc({
  description: "Download an employee document",
  input: EmployeeDocumentDownloadInput,
  output: EmployeeDocumentDownloadOutput,
  func: async ({ bambooHr }, data) => {
    return bambooHr.call("GET", "/employees/{employeeId}/files/{fileId}", data) as any
  },
})
