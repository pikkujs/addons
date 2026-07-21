import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { SetupIntentSchema } from '../../stripe.types.js'

export const SetupIntentGetInput = z.object({
  setupIntentId: z.string().describe('The identifier of the SetupIntent to retrieve (seti_...)'),
})

export const SetupIntentGetOutput = SetupIntentSchema

type Output = z.infer<typeof SetupIntentGetOutput>

export const setupIntentGet = pikkuSessionlessFunc({
  description: 'Retrieve a SetupIntent to check its status and read the saved payment method after client-side setup',
  node: { displayName: 'Get Setup Intent', category: 'Setup Intents', type: 'action' },
  input: SetupIntentGetInput,
  output: SetupIntentGetOutput,
  func: async ({ stripe }, { setupIntentId }) => {
    return await stripe.setupIntents.retrieve(setupIntentId) as unknown as Output
  },
})
