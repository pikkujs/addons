import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CardSchema = z.object({
  number: z.string().describe('The card number, as a string without any separators'),
  exp_month: z.string().describe('Two-digit number representing the card\'s expiration month'),
  exp_year: z.string().describe('Two- or four-digit number representing the card\'s expiration year'),
  cvc: z.string().optional().describe('Card security code. Highly recommended to always include this value'),
  name: z.string().optional().describe('Cardholder\'s full name'),
  address_line1: z.string().optional().describe('Address line 1'),
  address_line2: z.string().optional().describe('Address line 2'),
  address_city: z.string().optional().describe('City'),
  address_state: z.string().optional().describe('State'),
  address_zip: z.string().optional().describe('ZIP or postal code'),
  address_country: z.string().optional().describe('Two-letter country code'),
})

export const BankAccountSchema = z.object({
  country: z.string().describe('The country in which the bank account is located'),
  currency: z.string().describe('The currency the bank account is in'),
  account_holder_name: z.string().optional().describe('The name of the person or business that owns the bank account'),
  account_holder_type: z.enum(['individual', 'company']).optional().describe('The type of entity that holds the account'),
  routing_number: z.string().optional().describe('The routing number, sort code, or other country-appropriate institution number'),
  account_number: z.string().describe('The account number for the bank account'),
})

export const TokenCreateInput = z.object({
  card: CardSchema.optional().describe('The card this token will represent'),
  bank_account: BankAccountSchema.optional().describe('The bank account this token will represent'),
  customer: z.string().optional().describe('For cloning saved payment methods, the customer who owns the payment method'),
})

export const TokenCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('token').describe('String representing the object\'s type'),
  type: z.string().describe('Type of the token: account, bank_account, card, or pii'),
  client_ip: z.string().nullable().describe('IP address of the client that generates the token'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  used: z.boolean().describe('Determines if you have already used this token'),
  card: z.object({
    id: z.string().describe('Unique identifier for the card'),
    brand: z.string().describe('Card brand (Visa, Mastercard, etc.)'),
    last4: z.string().describe('The last four digits of the card'),
    exp_month: z.number().describe('Two-digit expiration month'),
    exp_year: z.number().describe('Four-digit expiration year'),
  }).optional().describe('The card associated with the token'),
})

type Input = z.infer<typeof TokenCreateInput>
type Output = z.infer<typeof TokenCreateOutput>

export const tokenCreate = pikkuSessionlessFunc({
  description: 'Creates a single-use token that represents a credit card, bank account, or other payment source',
  node: { displayName: 'Create Token', category: 'Tokens', type: 'action' },
  input: TokenCreateInput,
  output: TokenCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.tokens.create(data as Input) as Output
  },
})
