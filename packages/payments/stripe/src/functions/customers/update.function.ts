import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { AddressSchema, MetadataSchema } from '../../stripe.types.js'

export const CustomerUpdateInput = z.object({
  customerId: z.string().describe('The identifier of the customer to update'),
  name: z.string().optional().describe('The customer\'s full name or business name'),
  email: z.string().optional().describe('Customer\'s email address'),
  phone: z.string().optional().describe('The customer\'s phone number'),
  description: z.string().optional().describe('An arbitrary string that you can attach to a customer object'),
  address: AddressSchema.optional().describe('The customer\'s address'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object'),
  balance: z.number().optional().describe('An integer amount in cents that represents the customer\'s current balance'),
  coupon: z.string().optional().describe('The ID of a coupon to apply to the customer'),
  default_source: z.string().optional().describe('ID of the default payment source for the customer'),
  preferred_locales: z.array(z.string()).optional().describe('Customer\'s preferred languages, ordered by preference'),
})

export const CustomerUpdateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('customer').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('The customer\'s full name or business name'),
  email: z.string().nullable().describe('The customer\'s email address'),
  phone: z.string().nullable().describe('The customer\'s phone number'),
  description: z.string().nullable().describe('An arbitrary string attached to the object'),
  created: z.number().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  balance: z.number().describe('The current balance, if any, that\'s stored on the customer'),
  metadata: MetadataSchema,
})

type Input = z.infer<typeof CustomerUpdateInput>
type Output = z.infer<typeof CustomerUpdateOutput>

export const customerUpdate = pikkuSessionlessFunc({
  description: 'Updates the specified customer by setting the values of the parameters passed',
  node: { displayName: 'Update Customer', category: 'Customers', type: 'action' },
  input: CustomerUpdateInput,
  output: CustomerUpdateOutput,
  func: async ({ stripe }, data) => {
    const { customerId, ...params } = data as Input
    return await stripe.customers.update(customerId, params) as Output
  },
})
