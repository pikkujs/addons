import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerCardGetInput = z.object({
  customerId: z.string().describe('The ID of the customer whose card to retrieve'),
  cardId: z.string().describe('The ID of the card or source to retrieve'),
})

export const CustomerCardGetOutput = z.object({
  id: z.string().describe('Unique identifier for the card'),
  object: z.string().describe('String representing the object\'s type'),
  brand: z.string().optional().describe('Card brand (e.g., Visa, Mastercard)'),
  last4: z.string().optional().describe('The last four digits of the card'),
  exp_month: z.number().optional().describe('Two-digit number representing the card\'s expiration month'),
  exp_year: z.number().optional().describe('Four-digit number representing the card\'s expiration year'),
  fingerprint: z.string().nullable().optional().describe('Uniquely identifies this particular card number'),
  funding: z.string().optional().describe('Card funding type (credit, debit, prepaid, or unknown)'),
  country: z.string().nullable().optional().describe('Two-letter ISO code representing the country of the card'),
  customer: z.string().nullable().optional().describe('The customer that this card belongs to'),
})

type Output = z.infer<typeof CustomerCardGetOutput>

export const customerCardGet = pikkuSessionlessFunc({
  description: 'Retrieve a card or source belonging to a customer',
  node: { displayName: 'Get Customer Card', category: 'Customer Cards', type: 'action' },
  input: CustomerCardGetInput,
  output: CustomerCardGetOutput,
  func: async ({ stripe }, { customerId, cardId }) => {
    return await stripe.customers.retrieveSource(customerId, cardId) as Output
  },
})
