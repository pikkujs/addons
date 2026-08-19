import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DepartmentGetAllInput = z.object({
  sysparm_query: z.string().optional(),
  sysparm_fields: z.string().optional(),
  sysparm_limit: z.number().int().optional(),
})

export const DepartmentGetAllOutput = z.record(z.string(), z.unknown())

export const departmentGetAll = pikkuSessionlessFunc({
  description: "Get all departments",
  input: DepartmentGetAllInput,
  output: DepartmentGetAllOutput,
  func: async ({ servicenow }, data) => {
    return servicenow.call("GET", "/now/table/cmn_department", data) as any
  },
})
