import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const InvoiceItemCreateInput = z.object({
  customer: z.string().describe('The customer the invoice item is for (cus_...)'),
  amount: z.number().optional().describe('The integer amount in the smallest currency unit of the charge to add. Provide amount+currency, or price'),
  currency: z.string().optional().describe('Three-letter ISO currency code, required when amount is given'),
  price: z.string().optional().describe('The ID of an existing price to add as a line item, instead of amount+currency'),
  quantity: z.number().optional().describe('Quantity of units. Defaults to 1'),
  invoice: z.string().optional().describe('The invoice to add this item to. If omitted, the item is added to the customer\'s next upcoming invoice'),
  description: z.string().optional().describe('An arbitrary string which is displayed on the invoice line item'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the invoice item'),
})

export const InvoiceItemCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object (ii_...)'),
  object: z.literal('invoiceitem').describe('String representing the object\'s type'),
  customer: z.string().describe('The ID of the customer who will be billed'),
  amount: z.number().describe('Amount, in the smallest currency unit, of the invoice item'),
  currency: z.string().describe('Three-letter ISO currency code'),
  description: z.string().nullable().describe('An arbitrary string attached to the object, displayed on the invoice line item'),
  invoice: z.string().nullish().describe('The ID of the invoice this item belongs to, if any'),
  quantity: z.number().describe('Quantity of units for the invoice item'),
  metadata: MetadataSchema,
})

type Output = z.infer<typeof InvoiceItemCreateOutput>

export const invoiceItemCreate = pikkuSessionlessFunc({
  description: 'Add a line item (a charge) to a customer\'s invoice or their next upcoming invoice',
  node: { displayName: 'Create Invoice Item', category: 'Invoices', type: 'action' },
  input: InvoiceItemCreateInput,
  output: InvoiceItemCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.invoiceItems.create({
      customer: data.customer,
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.currency ? { currency: data.currency } : {}),
      ...(data.price ? { price: data.price } : {}),
      ...(data.quantity !== undefined ? { quantity: data.quantity } : {}),
      ...(data.invoice ? { invoice: data.invoice } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})
