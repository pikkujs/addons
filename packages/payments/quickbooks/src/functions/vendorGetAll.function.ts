import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VendorGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const VendorGetAllOutput = z.record(z.string(), z.unknown())

export const vendorGetAll = pikkuSessionlessFunc({
  description: "Vendor get all",
  input: VendorGetAllInput,
  output: VendorGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/vendor", data) as any
  },
})
