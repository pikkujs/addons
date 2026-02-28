import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormSubmitInput = z.object({
  portalId: z.string(),
  formId: z.string(),
  fields: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })),
  context: z.object({
    pageUri: z.string().optional(),
    pageName: z.string().optional(),
    hutk: z.string().optional(),
    ipAddress: z.string().optional(),
  }).optional(),
})

export const FormSubmitOutput = z.object({
  success: z.boolean(),
})

export const formSubmit = pikkuSessionlessFunc({
  description: 'Submits data to a HubSpot form',
  node: { displayName: 'Submit Form', category: 'Forms', type: 'action' },
  input: FormSubmitInput,
  output: FormSubmitOutput,
  func: async ({ hubspot }, { portalId, formId, fields, context }) => {
    await hubspot.formsRequest(
      'POST',
      `/submissions/v3/integration/secure/submit/${portalId}/${formId}`,
      {
        body: {
          fields,
          context,
        },
      }
    )
    return { success: true }
  },
})
