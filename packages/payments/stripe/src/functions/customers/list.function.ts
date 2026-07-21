import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const CustomerListInput = z.object({
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10'),
  email: z.string().optional().describe('A case-sensitive filter on the list based on the customer\'s email field'),
  startingAfter: z.string().optional().describe('A cursor for use in pagination. startingAfter is an object ID that defines your place in the list'),
  endingBefore: z.string().optional().describe('A cursor for use in pagination. endingBefore is an object ID that defines your place in the list'),
})

export const CustomerItemSchema = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('customer').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('The customer\'s full name or business name'),
  email: z.string().nullable().describe('The customer\'s email address'),
  phone: z.string().nullable().describe('The customer\'s phone number'),
  description: z.string().nullable().describe('An arbitrary string attached to the object'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  balance: z.number().describe('The current balance, if any, that\'s stored on the customer'),
  metadata: MetadataSchema,
})

export const CustomerListOutput = z.object({
  object: z.literal('list').describe('String representing the object\'s type'),
  data: z.array(CustomerItemSchema).describe('An array of customer objects'),
  hasMore: z.boolean().describe('True if this list has another page of items after this one'),
  url: z.string().describe('The URL where this list can be accessed'),
})

export const customerList = pikkuSessionlessFunc({
  description: 'Returns a list of your customers sorted by creation date, most recent first',
  node: { displayName: 'List Customers', category: 'Customers', type: 'action' },
  input: CustomerListInput,
  output: CustomerListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.customers.list(toStripeParams(data))
    return CustomerListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((customer) => ({
        ...fromStripeObject(customer),
        created: epochToIso(customer.created),
      })),
    })
  },
})
