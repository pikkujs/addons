import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VendorCreateInput = z.object({
  companyId: z.string(),
  DisplayName: z.string().optional(),
})

export const VendorCreateOutput = z.record(z.string(), z.unknown())

export const vendorCreate = pikkuSessionlessFunc({
  description: "Vendor create",
  input: VendorCreateInput,
  output: VendorCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/vendor", data) as any
  },
})
