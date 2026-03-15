import { z } from 'zod'

// Define Zod schemas for API types

export const BarcodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Barcode = z.infer<typeof BarcodeSchema>
