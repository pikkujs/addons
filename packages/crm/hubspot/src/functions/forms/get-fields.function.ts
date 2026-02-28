import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormGetFieldsInput = z.object({
  formId: z.string(),
})

export const FormGetFieldsOutput = z.object({
  fields: z.array(z.object({
    name: z.string(),
    label: z.string().optional(),
    type: z.string().optional(),
    fieldType: z.string().optional(),
    required: z.boolean().optional(),
    options: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  })),
})

export const formGetFields = pikkuSessionlessFunc({
  description: 'Gets the fields of a HubSpot form',
  node: { displayName: 'Get Form Fields', category: 'Forms', type: 'action' },
  input: FormGetFieldsInput,
  output: FormGetFieldsOutput,
  func: async ({ hubspot }, { formId }) => {
    const result = await hubspot.request<{
      fieldGroups: Array<{
        fields: Array<{
          name: string
          label?: string
          type?: string
          fieldType?: string
          required?: boolean
          options?: Array<{ label: string; value: string }>
        }>
      }>
    }>('GET', `/marketing/v3/forms/${formId}`)

    const fields = result.fieldGroups?.flatMap(g => g.fields) ?? []
    return { fields }
  },
})
