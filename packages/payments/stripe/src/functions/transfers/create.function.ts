import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, TransferSchema } from '../../stripe.types.js'

export const TransferCreateInput = z.object({
  amount: z.number().describe('Amount, in the smallest currency unit, to transfer to the connected account (e.g. the seller\'s cut of a marketplace sale)'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  destination: z.string().describe('The connected account to send the funds to (acct_...)'),
  transfer_group: z.string().optional().describe('A string that groups this transfer with the originating charge, so you can reconcile a split payment'),
  source_transaction: z.string().optional().describe('The ID of a charge to draw the transferred funds from, so the transfer only settles once that charge does'),
  description: z.string().optional().describe('An arbitrary string attached to the transfer'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the transfer'),
  idempotency_key: z.string().optional().describe('Idempotency key so a retried transfer does not double-pay the seller'),
})

export const TransferCreateOutput = TransferSchema

type Output = z.infer<typeof TransferCreateOutput>

export const transferCreate = pikkuSessionlessFunc({
  description: 'Transfer funds from your platform balance to a connected account (marketplace payout to a seller)',
  node: { displayName: 'Create Transfer', category: 'Connect', type: 'action' },
  input: TransferCreateInput,
  output: TransferCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.transfers.create(
      {
        amount: data.amount,
        currency: data.currency,
        destination: data.destination,
        ...(data.transfer_group ? { transfer_group: data.transfer_group } : {}),
        ...(data.source_transaction ? { source_transaction: data.source_transaction } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotency_key ? { idempotencyKey: data.idempotency_key } : undefined,
    ) as unknown as Output
  },
})
