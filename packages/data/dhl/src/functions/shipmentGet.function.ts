import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShipmentGetInput = z.object({
  trackingNumber: z.string(),
  recipientPostalCode: z.string().optional(),
})

export const ShipmentGetOutput = z.object({
  shipments: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const shipmentGet = pikkuSessionlessFunc({
  description: "Get tracking details for a shipment",
  input: ShipmentGetInput,
  output: ShipmentGetOutput,
  func: async ({ dhl }, data) => {
    return dhl.call("GET", "/track/shipments", data) as any
  },
})
