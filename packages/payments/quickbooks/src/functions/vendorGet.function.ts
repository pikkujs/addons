import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VendorGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const VendorGetOutput = z.record(z.string(), z.unknown())

export const vendorGet = pikkuSessionlessFunc({
  description: "Vendor get",
  input: VendorGetInput,
  output: VendorGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/vendor/{id}", data) as any
  },
})
