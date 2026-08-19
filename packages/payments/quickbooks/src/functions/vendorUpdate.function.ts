import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VendorUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  DisplayName: z.string().optional(),
})

export const VendorUpdateOutput = z.record(z.string(), z.unknown())

export const vendorUpdate = pikkuSessionlessFunc({
  description: "Vendor update",
  input: VendorUpdateInput,
  output: VendorUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/vendor/update", data) as any
  },
})
