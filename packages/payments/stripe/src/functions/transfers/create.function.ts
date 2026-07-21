import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, TransferSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const TransferCreateInput = z.object({
  amount: z.number().describe('Amount, in the smallest currency unit, to transfer to the connected account (e.g. the seller\'s cut of a marketplace sale)'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  destination: z.string().describe('The connected account to send the funds to (acct_...)'),
  transferGroup: z.string().optional().describe('A string that groups this transfer with the originating charge, so you can reconcile a split payment'),
  sourceTransaction: z.string().optional().describe('The ID of a charge to draw the transferred funds from, so the transfer only settles once that charge does'),
  description: z.string().optional().describe('An arbitrary string attached to the transfer'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the transfer'),
  idempotencyKey: z.string().optional().describe('Idempotency key so a retried transfer does not double-pay the seller'),
})

export const TransferCreateOutput = TransferSchema

export const transferCreate = pikkuSessionlessFunc({
  description: 'Transfer funds from your platform balance to a connected account (marketplace payout to a seller)',
  node: { displayName: 'Create Transfer', category: 'Connect', type: 'action' },
  input: TransferCreateInput,
  output: TransferCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.transfers.create(
      {
        amount: data.amount,
        currency: data.currency,
        destination: data.destination,
        ...(data.transferGroup ? { transfer_group: data.transferGroup } : {}),
        ...(data.sourceTransaction ? { source_transaction: data.sourceTransaction } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotencyKey ? { idempotencyKey: data.idempotencyKey } : undefined,
    )
    const camel = fromStripeObject(result)
    return TransferCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
