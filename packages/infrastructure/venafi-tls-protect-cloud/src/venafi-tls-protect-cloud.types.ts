import { z } from 'zod'

// Define Zod schemas for API types

export const VenafiTlsProtectCloudResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add fields based on API response
})

export type VenafiTlsProtectCloudResource = z.infer<typeof VenafiTlsProtectCloudResourceSchema>
