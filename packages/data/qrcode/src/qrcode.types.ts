import { z } from 'zod'

// Define Zod schemas for API types

export const QrcodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type Qrcode = z.infer<typeof QrcodeSchema>
