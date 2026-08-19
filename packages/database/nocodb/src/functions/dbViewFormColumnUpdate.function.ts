import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewFormColumnUpdateInput = z.object({
  formViewColumnId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Form View Column ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  description: z.union([z.string(), z.unknown()]).optional().describe("Form Column Description"),
  help: z.union([z.string(), z.unknown()]).optional().describe("Form Column Help Text (Not in use)"),
  label: z.union([z.string(), z.unknown()]).optional().describe("Form Column Label"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info"),
  order: z.number().optional().describe("The order among all the columns in the form"),
  required: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this form column required in submission?"),
  show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown in Form?"),
})

export const DbViewFormColumnUpdateOutput = z.object({
  description: z.union([z.string(), z.unknown()]).optional().describe("Form Column Description"),
  help: z.union([z.string(), z.unknown()]).optional().describe("Form Column Help Text (Not in use)"),
  label: z.union([z.string(), z.unknown()]).optional().describe("Form Column Label"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta Info"),
  order: z.number().optional().describe("The order among all the columns in the form"),
  required: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this form column required in submission?"),
  show: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this column shown in Form?"),
}).describe("Model for Form Column Request")

export const dbViewFormColumnUpdate = pikkuSessionlessFunc({
  description: "Update the form column(s) by Form View Column ID",
  input: DbViewFormColumnUpdateInput,
  output: DbViewFormColumnUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/form-columns/{formViewColumnId}", data) as any
  },
})
