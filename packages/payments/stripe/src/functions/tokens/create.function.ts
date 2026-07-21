import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const CardSchema = z.object({
  number: z.string().describe('The card number, as a string without any separators'),
  expMonth: z.string().describe('Two-digit number representing the card\'s expiration month'),
  expYear: z.string().describe('Two- or four-digit number representing the card\'s expiration year'),
  cvc: z.string().optional().describe('Card security code. Highly recommended to always include this value'),
  name: z.string().optional().describe('Cardholder\'s full name'),
  addressLine1: z.string().optional().describe('Address line 1'),
  addressLine2: z.string().optional().describe('Address line 2'),
  addressCity: z.string().optional().describe('City'),
  addressState: z.string().optional().describe('State'),
  addressZip: z.string().optional().describe('ZIP or postal code'),
  addressCountry: z.string().optional().describe('Two-letter country code'),
})

export const BankAccountSchema = z.object({
  country: z.string().describe('The country in which the bank account is located'),
  currency: z.string().describe('The currency the bank account is in'),
  accountHolderName: z.string().optional().describe('The name of the person or business that owns the bank account'),
  accountHolderType: z.enum(['individual', 'company']).optional().describe('The type of entity that holds the account'),
  routingNumber: z.string().optional().describe('The routing number, sort code, or other country-appropriate institution number'),
  accountNumber: z.string().describe('The account number for the bank account'),
})

export const TokenCreateInput = z.object({
  card: CardSchema.optional().describe('The card this token will represent'),
  bankAccount: BankAccountSchema.optional().describe('The bank account this token will represent'),
  customer: z.string().optional().describe('For cloning saved payment methods, the customer who owns the payment method'),
})

export const TokenCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('token').describe('String representing the object\'s type'),
  type: z.string().describe('Type of the token: account, bank_account, card, or pii'),
  clientIp: z.string().nullable().describe('IP address of the client that generates the token'),
  created: z.string().datetime().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  used: z.boolean().describe('Determines if you have already used this token'),
  card: z.object({
    id: z.string().describe('Unique identifier for the card'),
    brand: z.string().describe('Card brand (Visa, Mastercard, etc.)'),
    last4: z.string().describe('The last four digits of the card'),
    expMonth: z.number().describe('Two-digit expiration month'),
    expYear: z.number().describe('Four-digit expiration year'),
  }).optional().describe('The card associated with the token'),
})

export const tokenCreate = pikkuSessionlessFunc({
  description: 'Creates a single-use token that represents a credit card, bank account, or other payment source',
  node: { displayName: 'Create Token', category: 'Tokens', type: 'action' },
  input: TokenCreateInput,
  output: TokenCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.tokens.create(toStripeParams(data))
    const camel = fromStripeObject(result)
    return TokenCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
