import { z } from 'zod'

// Common schemas with SDK descriptions

export const AddressSchema = z.object({
  line1: z.string().optional().describe('Address line 1 (Street address/PO Box/Company name)'),
  line2: z.string().optional().describe('Address line 2 (Apartment/Suite/Unit/Building)'),
  city: z.string().optional().describe('City/District/Suburb/Town/Village'),
  state: z.string().optional().describe('State/County/Province/Region'),
  country: z.string().optional().describe('2-letter country code'),
  postal_code: z.string().optional().describe('ZIP or postal code'),
})

export const MetadataSchema = z.record(z.string(), z.string()).describe('Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format')

// Types
export type Address = z.infer<typeof AddressSchema>
export type Metadata = z.infer<typeof MetadataSchema>
