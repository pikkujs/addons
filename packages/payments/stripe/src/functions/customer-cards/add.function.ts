import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const CustomerCardAddInput = z.object({
  customerId: z.string().describe('The ID of the customer to add the card to'),
  source: z.string().describe('A token (e.g., tok_xxx) representing the card to add'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the card object'),
})

export const CustomerCardAddOutput = z.object({
  id: z.string().describe('Unique identifier for the card'),
  object: z.string().describe('String representing the object\'s type (card)'),
  brand: z.string().describe('Card brand (e.g., Visa, Mastercard)'),
  last4: z.string().describe('The last four digits of the card'),
  exp_month: z.number().describe('Two-digit number representing the card\'s expiration month'),
  exp_year: z.number().describe('Four-digit number representing the card\'s expiration year'),
  fingerprint: z.string().nullable().optional().describe('Uniquely identifies this particular card number'),
  funding: z.string().describe('Card funding type (credit, debit, prepaid, or unknown)'),
  country: z.string().nullable().describe('Two-letter ISO code representing the country of the card'),
  customer: z.string().nullable().describe('The customer that this card belongs to'),
})

type Output = z.infer<typeof CustomerCardAddOutput>

export const customerCardAdd = pikkuSessionlessFunc({
  description: 'Add a card to a customer using a token',
  node: { displayName: 'Add Customer Card', category: 'Customer Cards', type: 'action' },
  input: CustomerCardAddInput,
  output: CustomerCardAddOutput,
  func: async ({ stripe }, { customerId, ...params }) => {
    return await stripe.customers.createSource(customerId, params) as Output
  },
})
