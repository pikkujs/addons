import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { SetupIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SetupIntentGetInput = z.object({
  setupIntentId: z.string().describe('The identifier of the SetupIntent to retrieve (seti_...)'),
})

export const SetupIntentGetOutput = SetupIntentSchema

export const setupIntentGet = pikkuSessionlessFunc({
  description: 'Retrieve a SetupIntent to check its status and read the saved payment method after client-side setup',
  node: { displayName: 'Get Setup Intent', category: 'Setup Intents', type: 'action' },
  input: SetupIntentGetInput,
  output: SetupIntentGetOutput,
  func: async ({ stripe }, { setupIntentId }) => {
    const result = await stripe.setupIntents.retrieve(setupIntentId)
    const camel = fromStripeObject(result)
    return SetupIntentGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
