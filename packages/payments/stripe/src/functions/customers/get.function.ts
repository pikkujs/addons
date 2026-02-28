import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const CustomerGetInput = z.object({
  customerId: z.string().describe('The identifier of the customer to be retrieved'),
})

export const CustomerGetOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('customer').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('The customer\'s full name or business name'),
  email: z.string().nullable().describe('The customer\'s email address'),
  phone: z.string().nullable().describe('The customer\'s phone number'),
  description: z.string().nullable().describe('An arbitrary string attached to the object. Often useful for displaying to users'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
  balance: z.number().describe('The current balance, if any, that\'s stored on the customer'),
  currency: z.string().nullable().optional().describe('Three-letter ISO code for the currency the customer can be charged in'),
  delinquent: z.boolean().nullable().optional().describe('Tracks the most recent state change on any invoice belonging to the customer'),
  metadata: MetadataSchema,
})

type Output = z.infer<typeof CustomerGetOutput>

export const customerGet = pikkuSessionlessFunc({
  description: 'Retrieves a Customer object',
  node: { displayName: 'Get Customer', category: 'Customers', type: 'action' },
  input: CustomerGetInput,
  output: CustomerGetOutput,
  func: async ({ stripe }, { customerId }) => {
    return await stripe.customers.retrieve(customerId) as Output
  },
})
