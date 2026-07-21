import { z } from 'zod'

// Define Zod schemas for API types

export const UrlScanIoResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type UrlScanIoResource = z.infer<typeof UrlScanIoResourceSchema>
