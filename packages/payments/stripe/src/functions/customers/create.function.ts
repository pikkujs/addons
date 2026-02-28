import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { AddressSchema, MetadataSchema } from '../../stripe.types.js'

export const CustomerCreateInput = z.object({
  name: z.string().optional().describe('The customer\'s full name or business name'),
  email: z.string().optional().describe('Customer\'s email address. It\'s displayed alongside the customer in your dashboard and can be useful for searching and tracking'),
  phone: z.string().optional().describe('The customer\'s phone number'),
  description: z.string().optional().describe('An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard'),
  address: AddressSchema.optional().describe('The customer\'s address'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format'),
  balance: z.number().optional().describe('An integer amount in cents that represents the customer\'s current balance, which affect the customer\'s future invoices'),
  coupon: z.string().optional().describe('The ID of a coupon to apply to the customer'),
  payment_method: z.string().optional().describe('The ID of a payment method to attach to the customer'),
  preferred_locales: z.array(z.string()).optional().describe('Customer\'s preferred languages, ordered by preference'),
})

export const CustomerCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('customer').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('The customer\'s full name or business name'),
  email: z.string().nullable().describe('The customer\'s email address'),
  phone: z.string().nullable().describe('The customer\'s phone number'),
  description: z.string().nullable().describe('An arbitrary string attached to the object. Often useful for displaying to users'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
  balance: z.number().describe('The current balance, if any, that\'s stored on the customer'),
  currency: z.string().nullable().optional().describe('Three-letter ISO code for the currency the customer can be charged in for recurring billing purposes'),
  metadata: MetadataSchema,
})

type Input = z.infer<typeof CustomerCreateInput>
type Output = z.infer<typeof CustomerCreateOutput>

export const customerCreate = pikkuSessionlessFunc({
  description: 'Create a customer to track recurring charges and save payment information',
  node: { displayName: 'Create Customer', category: 'Customers', type: 'action' },
  input: CustomerCreateInput,
  output: CustomerCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.customers.create(data as Input) as Output
  },
})
